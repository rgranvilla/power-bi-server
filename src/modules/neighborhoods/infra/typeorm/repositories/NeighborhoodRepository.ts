import { Repository } from "typeorm";

import { ICreateNeighborhoodDTO } from "@modules/neighborhoods/dtos/ICreateNeighborhoodDTO";
import { INeighborhoodRepository } from "@modules/neighborhoods/repositories/INeighborhoodRepository";
import dataSource from "@shared/infra/typeorm";

import { Neighborhood } from "../entities/Neighborhood";

class NeighborhoodRepository implements INeighborhoodRepository {
  private repository: Repository<Neighborhood>;

  constructor() {
    this.repository = dataSource.getRepository(Neighborhood);
  }

  async create({
    id,
    code,
    neighborhood,
    city,
    state,
    area,
  }: ICreateNeighborhoodDTO): Promise<Neighborhood> {
    const neighbor = this.repository.create({
      id,
      code,
      neighborhood,
      city,
      state,
      area,
    });

    const res = await this.repository.save(neighbor);

    return res;
  }

  async findById(id: string): Promise<Neighborhood> {
    const neighbor = this.repository.findOneBy({ id });

    return neighbor;
  }

  async findByNeighborhood(neighborhood: string): Promise<Neighborhood[]> {
    const neighbors = await this.repository.find({
      where: {
        neighborhood,
      },
    });

    return neighbors;
  }

  async findNeighborhood({
    neighborhood,
    city,
    state,
  }: {
    neighborhood: string;
    city: string;
    state: string;
  }): Promise<Neighborhood> {
    const neighbor = await this.repository.findOneBy({
      neighborhood,
      city,
      state,
    });

    return neighbor;
  }

  async findNeighborhoodsByCity({
    city,
    state,
  }: {
    city: string;
    state: string;
  }): Promise<Neighborhood[]> {
    const neighbors = await this.repository.find({
      where: {
        city,
        state,
      },
    });

    return neighbors;
  }
}

export { NeighborhoodRepository };
