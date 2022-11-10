import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";
import { INeighborsCompetitorsRepository } from "@modules/neighborsCompetitors/repositories/INeighborsCompetitorsRepository";

interface IImportCompetitor {
  id: string;
  competitor_name: string;
  category: string;
  price_range: string;
  address: string;
  city: string;
  state: string;
  neighborhood_id: string;
}

@injectable()
class ImportNeighborsCompetitorsUseCase {
  private neighborshoods: Neighborhood[] = [];

  constructor(
    @inject("NeighborsCompetitorsRepository")
    private competitorsRepository: INeighborsCompetitorsRepository,
    @inject("NeighborhoodsRepository")
    private neighborhoodsRepository: INeighborhoodsRepository
  ) {}

  loadCompetitors(file: Express.Multer.File): Promise<IImportCompetitor[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const competitors: IImportCompetitor[] = [];

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

  async loadNeighborshoods(): Promise<void> {
    const res = await this.neighborhoodsRepository.getAllNeighborhoods();

    this.neighborshoods.push(...res);
  }

  isValidCompetitorDataToCreateCompetitor(competitor: IImportCompetitor) {
    const hasNeighborId = !!competitor?.neighborhood_id;
    const hasCity = !!competitor?.city;
    const hasState = !!competitor?.state;
    const hasCompetitorName = !!competitor.competitor_name;
    const hasCategory = !!competitor.category;
    const hasAddress = !!competitor.address;
    const hasPriceRange = !!competitor.price_range;

    const isValid =
      hasNeighborId &&
      hasCity &&
      hasState &&
      hasCompetitorName &&
      hasCategory &&
      hasAddress &&
      hasPriceRange;

    return isValid;
  }

  async _createCompetitor(competitor: IImportCompetitor): Promise<void> {
    await this.competitorsRepository.create({
      ...competitor,
    });
  }

  async _handleCreateCompetitor(
    competitors: IImportCompetitor[]
  ): Promise<void> {
    if (competitors.length === 0) return;

    const competitor = competitors.shift();

    const isValidCompetitorData =
      this.isValidCompetitorDataToCreateCompetitor(competitor);

    const hasNeighborhoodId = this.neighborshoods.some(
      (element) => element.id === competitor.neighborhood_id
    );

    if (isValidCompetitorData && hasNeighborhoodId)
      await this._createCompetitor(competitor);

    return await this._handleCreateCompetitor(competitors);
  }

  async execute(file: Express.Multer.File): Promise<void> {
    await this.loadNeighborshoods();
    const competitors = await this.loadCompetitors(file);

    await this._handleCreateCompetitor(competitors);
  }
}

export { ImportNeighborsCompetitorsUseCase };
