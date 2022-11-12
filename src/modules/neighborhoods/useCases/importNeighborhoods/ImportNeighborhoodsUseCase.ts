import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { INeighborhoodDTO } from "@modules/neighborhoods/dtos/INeighborhoodDTO";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";

interface IImportNeighborhood {
  neighborhood_id: string;
  neighborhood: string;
  city: string;
  state: string;
  area: string;
}

@injectable()
class ImportNeighborhoodsUseCase {
  private neighborhoods: INeighborhoodDTO[] = [];

  constructor(
    @inject("NeighborhoodsRepository")
    private neighborhoodsRepository: INeighborhoodsRepository
  ) {}

  async loadSavedNeighborhoods(): Promise<void> {
    this.neighborhoods =
      await this.neighborhoodsRepository.getAllNeighborhoods();
  }

  loadNeighborhoods(file: Express.Multer.File): Promise<IImportNeighborhood[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const neighborhoods: IImportNeighborhood[] = [];

      const parseFile = parse({
        from_line: 2,
        delimiter: ",",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [neighborhood_id, neighborhood, city, state, area] = line;

          neighborhoods.push({
            neighborhood_id,
            neighborhood,
            city,
            state,
            area,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(neighborhoods);
        })
        .on("error", (err) => {
          fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async createNeighborhood(
    neighborhoods: IImportNeighborhood[]
  ): Promise<void> {
    if (neighborhoods.length > 0) {
      const neighbor = neighborhoods.shift();

      const { neighborhood, neighborhood_id, city, state, area } = neighbor;

      const neighborhoodAlreadyExists = this.neighborhoods.find(
        (item) =>
          item.neighborhood === neighborhood &&
          item.city === city &&
          item.state === state
      );

      if (!neighborhoodAlreadyExists) {
        await this.neighborhoodsRepository.create({
          neighborhood,
          neighborhood_id,
          city,
          state,
          area,
        });
      }

      await this.createNeighborhood(neighborhoods);
    }
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const neighborhoods = await this.loadNeighborhoods(file);

    await this.createNeighborhood(neighborhoods);
  }
}

export { ImportNeighborhoodsUseCase };
