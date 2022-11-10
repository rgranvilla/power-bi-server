import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";

interface IImportNeighborhood {
  id: string;
  neighborhood: string;
  city: string;
  state: string;
  area: string;
}

@injectable()
class ImportNeighborhoodsUseCase {
  constructor(
    @inject("NeighborhoodsRepository")
    private neighborhoodsRepository: INeighborhoodsRepository
  ) {}

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
          const [id, neighborhood, city, state, area] = line;

          neighborhoods.push({
            id,
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

      const { id, neighborhood, city, state, area } = neighbor;

      const neighborhoodAlreadyExists =
        await this.neighborhoodsRepository.findNeighborhood({
          neighborhood,
          city,
          state,
        });

      if (!neighborhoodAlreadyExists) {
        await this.neighborhoodsRepository.create({
          id,
          neighborhood,
          city,
          state,
          area: Number(area),
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
