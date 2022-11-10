import { Repository } from "typeorm";

import { ICreatePopulationDTO } from "@modules/neighborhoods/dtos/ICreatePopulationDTO";
import { IPopulationRepository } from "@modules/neighborhoods/repositories/IPopulationRepository";
import dataSource from "@shared/infra/typeorm";

import { Population } from "../entities/Population";

class PopulationRepository implements IPopulationRepository {
  private repository: Repository<Population>;

  constructor() {
    this.repository = dataSource.getRepository(Population);
  }

  async create({
    id,
    neighborhood_id,
    population,
  }: ICreatePopulationDTO): Promise<Population> {
    const neighborPopulation = this.repository.create({
      id,
      neighborhood_id,
      population,
    });

    const alreadyExist = await this.repository.findOneBy({
      neighborhood_id,
    });

    if (!alreadyExist) {
      const res = await this.repository.save(neighborPopulation);

      return res;
    }
  }

  async findById(id: string): Promise<Population> {
    const population = await this.repository.findOneBy({ id });

    return population;
  }

  async findPopulationByNeighborhoodId(neighborId: string): Promise<number> {
    const { population } = await this.repository.findOneBy({
      neighborhood_id: neighborId,
    });

    return population;
  }
}

export { PopulationRepository };
