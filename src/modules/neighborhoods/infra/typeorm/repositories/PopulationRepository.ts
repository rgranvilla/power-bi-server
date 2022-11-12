import { Repository } from "typeorm";

import { ICreatePopulationDTO } from "@modules/neighborhoods/dtos/ICreatePopulationDTO";
import { IPopulationRepository } from "@modules/neighborhoods/repositories/IPopulationRepository";
import dataSource from "@shared/infra/typeorm";

import { Neighborhood } from "../entities/Neighborhood";
import { Population } from "../entities/Population";

class PopulationRepository implements IPopulationRepository {
  private repository: Repository<Population>;

  constructor() {
    this.repository = dataSource.getRepository(Population);
  }

  async create({
    population,
    neighborhood,
  }: ICreatePopulationDTO): Promise<Population> {
    const neighborPopulation = this.repository.create({
      population,
      neighborhood,
    });

    await this.repository
      .createQueryBuilder()
      .relation(Neighborhood, "neighbor_population")
      .of(neighborhood)
      .set(neighborPopulation.id);

    const res = await this.repository.save(neighborPopulation);

    return res;
  }

  async getPopulations(): Promise<Population[]> {
    const allPopulation = await this.repository.find();

    return allPopulation;
  }
}

export { PopulationRepository };
