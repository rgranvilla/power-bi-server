import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { INeighborhoodDTO } from "@modules/neighborhoods/dtos/INeighborhoodDTO";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";

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

  loadNeighborhoods(file: Express.Multer.File): Promise<INeighborhoodDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const neighborhoods: INeighborhoodDTO[] = [];

      const parseFile = parse({
        from_line: 2,
        delimiter: ",",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [neighborhood_id, name, city, state, area] = line;

          neighborhoods.push({
            neighborhood_id,
            name,
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

  async createNeighborhood(neighborhoods: INeighborhoodDTO[]): Promise<void> {
    if (neighborhoods.length > 0) {
      const neighbor = neighborhoods.shift();

      const { name, neighborhood_id, city, state, area } = neighbor;

      const neighborhoodAlreadyExists = this.neighborhoods.find(
        (item) =>
          item.name === name && item.city === city && item.state === state
      );

      if (!neighborhoodAlreadyExists) {
        await this.neighborhoodsRepository.create({
          neighborhood_id,
          name,
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
