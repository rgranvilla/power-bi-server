import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { INeighborhoodDTO } from "@modules/neighborhoods/dtos/INeighborhoodDTO";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";
import { INeighborCompetitorDTO } from "@modules/neighborsCompetitors/dtos/INeighborCompetitorDTO";
import { INeighborsCompetitorsRepository } from "@modules/neighborsCompetitors/repositories/INeighborsCompetitorsRepository";

@injectable()
class ImportNeighborsCompetitorsUseCase {
  private neighborshoods: INeighborhoodDTO[] = [];
  private neighborCompetitor: INeighborCompetitorDTO[] = [];

  constructor(
    @inject("NeighborsCompetitorsRepository")
    private competitorsRepository: INeighborsCompetitorsRepository,
    @inject("NeighborhoodsRepository")
    private neighborhoodsRepository: INeighborhoodsRepository
  ) {}

  loadCompetitors(
    file: Express.Multer.File
  ): Promise<INeighborCompetitorDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const competitors: INeighborCompetitorDTO[] = [];

      const parseFile = parse({
        from_line: 2,
        delimiter: ",",
        trim: true,
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [
            id,
            competitor_name,
            category,
            price_range,
            address,
            city,
            state,
            neighborhood_id,
          ] = line;

          const hasNeighborhood = this.neighborshoods.find(
            (item) => item.neighborhood_id === neighborhood_id
          );

          const alreadyExist = this.neighborCompetitor.find(
            (item) => item.id === id
          );

          if (hasNeighborhood && !alreadyExist)
            competitors.push({
              id,
              competitor_name,
              category,
              price_range,
              address,
              city,
              state,
              neighborhood_id,
            });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(competitors);
        })
        .on("error", (err) => {
          fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async loadRepositories(): Promise<void> {
    const neighbors = await this.neighborhoodsRepository.getAllNeighborhoods();
    const competitors = await this.competitorsRepository.getAllCompetitors();
    this.neighborshoods.push(...neighbors);
    this.neighborCompetitor.push(...competitors);
  }

  async _handleCreateCompetitor(
    competitors: INeighborCompetitorDTO[]
  ): Promise<void> {
    if (competitors.length === 0) return;

    const competitor = competitors.shift();

    const { neighborhood_id } = competitor;

    const neighborhood =
      await this.neighborhoodsRepository.findByNeighborhoodId(neighborhood_id);

    if (neighborhood)
      await this.competitorsRepository.create({
        ...competitor,
        neighborhood,
      });

    return await this._handleCreateCompetitor(competitors);
  }

  async execute(file: Express.Multer.File): Promise<void> {
    await this.loadRepositories();
    const competitors = await this.loadCompetitors(file);

    await this._handleCreateCompetitor(competitors);
  }
}

export { ImportNeighborsCompetitorsUseCase };
