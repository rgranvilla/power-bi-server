import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { Competitor } from "@modules/competitors/infra/typeorm/entities/Competitor";
import { ICompetitorsRepository } from "@modules/competitors/repositories/ICompetitorsRepository";
import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";

interface ICompetitorType {
  competitor_id: string;
  neighborhood_id: string;
  competitor_name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  price_range: string;
  neighborhood: Neighborhood;
}

@injectable()
class ImportCompetitorsUseCase {
  private neighborshoods: Neighborhood[] = [];
  private competitors: Competitor[] = [];

  constructor(
    @inject("CompetitorsRepository")
    private competitorsRepository: ICompetitorsRepository,
    @inject("NeighborhoodsRepository")
    private neighborhoodsRepository: INeighborhoodsRepository
  ) {}

  loadCompetitors(file: Express.Multer.File): Promise<ICompetitorType[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const competitors: ICompetitorType[] = [];

      const parseFile = parse({
        from_line: 2,
        delimiter: ",",
        trim: true,
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [
            competitor_id,
            competitor_name,
            category,
            price_range,
            address,
            city,
            state,
            neighborhood_id,
          ] = line;

          const neighborhood = this.neighborshoods.find(
            (item) => item.neighborhood_id === neighborhood_id
          );

          const alreadyExist = this.competitors.find(
            (item) => item.competitor_id === competitor_id
          );

          if (neighborhood && !alreadyExist)
            competitors.push({
              competitor_id,
              neighborhood_id,
              competitor_name,
              category,
              address,
              city,
              state,
              price_range,
              neighborhood,
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
    this.competitors.push(...competitors);
  }

  async _handleCreateCompetitor(competitors: ICompetitorType[]): Promise<void> {
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

export { ImportCompetitorsUseCase };
