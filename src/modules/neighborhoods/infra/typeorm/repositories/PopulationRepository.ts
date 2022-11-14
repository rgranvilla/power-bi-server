import { Repository } from "typeorm";

import { IPopulationDTO } from "@modules/neighborhoods/dtos/IPopulationDTO";
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
    neighborhood_id,
    population,
    neighborhood,
  }: IPopulationDTO): Promise<Population> {
    const demographic_density = (+population / +neighborhood.area).toFixed(0);
    const neighborPopulation = this.repository.create({
      population_id: neighborhood_id,
      population,
      demographic_density,
      neighborhood,
      neighborhood_id,
    });

    await this.repository
      .createQueryBuilder()
      .relation(Neighborhood, "population")
      .of(neighborhood)
      .set(neighborPopulation.population_id);

    const res = await this.repository.save(neighborPopulation);

    return res;
  }

  async getPopulations(): Promise<Population[]> {
    const allPopulation = await this.repository.find();

    return allPopulation;
  }
}

export { PopulationRepository };
