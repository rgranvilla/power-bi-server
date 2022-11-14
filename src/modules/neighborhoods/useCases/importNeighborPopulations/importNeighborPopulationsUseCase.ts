/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";
import { IPopulationRepository } from "@modules/neighborhoods/repositories/IPopulationRepository";

interface IImportPopulation {
  codigo: string;
  populacao: string;
}

@injectable()
class ImportNeighborPopulationsUseCase {
  constructor(
    @inject("PopulationRepository")
    private populationRepository: IPopulationRepository,
    @inject("NeighborhoodsRepository")
    private neighborhoodsRepository: INeighborhoodsRepository
  ) {}

  loadPopulations(file: Express.Multer.File): Promise<IImportPopulation[]> {
    const population = fs.readFileSync(file.path, "utf8");

    return JSON.parse(population);
  }

  async createNeighborPopulation(
    populations: IImportPopulation[]
  ): Promise<void> {
    if (populations.length === 0) return;

    const neighborPopulation = populations.shift();

    const { codigo: neighborhood_id, populacao: population } =
      neighborPopulation;

    const neighborhood =
      await this.neighborhoodsRepository.findByNeighborhoodId(neighborhood_id);
    const neighborIdExist = !!neighborhood?.neighborhood_id;

    if (!neighborIdExist)
      return await this.createNeighborPopulation(populations);

    if (population) {
      await this.populationRepository.create({
        neighborhood_id,
        population,
        neighborhood,
      });
    }

    return await this.createNeighborPopulation(populations);
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const populations = await this.loadPopulations(file);

    await this.createNeighborPopulation(populations);
  }
}

export { ImportNeighborPopulationsUseCase };
