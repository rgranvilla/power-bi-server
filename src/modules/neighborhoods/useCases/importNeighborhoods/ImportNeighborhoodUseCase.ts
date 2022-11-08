import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { INeighborhoodRepository } from "@modules/neighborhoods/repositories/INeighborhoodRepository";

interface IImportNeighborhood {
  code: string;
  neighborhood: string;
  city: string;
  state: string;
  area: string;
}

@injectable()
class ImportNeighborhoodUseCase {
  constructor(
    @inject("NeighborhoodRepository")
    private neighborhoodRepository: INeighborhoodRepository
  ) {}

  loadNeighborhoods(file: Express.Multer.File): Promise<IImportNeighborhood[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const neighborhoods: IImportNeighborhood[] = [];

      const parseFile = parse({
        delimiter: ",",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [code, neighborhood, city, state, area] = line;

          if (code !== "codigo")
            neighborhoods.push({
              code,
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

  orderNeighborhoods(
    neighborhoods: IImportNeighborhood[]
  ): IImportNeighborhood[] {
    const orderedNeighborhoods = neighborhoods.sort((a, b) => {
      if (a.city === b.city) {
        return a.neighborhood < b.neighborhood ? -1 : 1;
      } else {
        return a.city < b.city ? -1 : 1;
      }
    });

    return orderedNeighborhoods;
  }

  async createNeighborhood(
    neighborhoods: IImportNeighborhood[]
  ): Promise<void> {
    if (neighborhoods.length > 0) {
      const neighbor = neighborhoods.shift();

      const { code, neighborhood, city, state, area } = neighbor;

      const neighborhoodAlreadyExists =
        await this.neighborhoodRepository.findNeighborhood({
          neighborhood,
          city,
          state,
        });

      if (!neighborhoodAlreadyExists) {
        await this.neighborhoodRepository.create({
          code,
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

    const orderedNeighborhoods = this.orderNeighborhoods(neighborhoods);

    console.log(orderedNeighborhoods);

    await this.createNeighborhood(orderedNeighborhoods);
  }
}

export { ImportNeighborhoodUseCase };
