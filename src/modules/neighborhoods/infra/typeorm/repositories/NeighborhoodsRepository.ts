import { isEmpty } from "lodash";
import { Repository } from "typeorm";

import { ICreateNeighborhoodDTO } from "@modules/neighborhoods/dtos/ICreateNeighborhoodDTO";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";
import dataSource from "@shared/infra/typeorm";

import { Neighborhood } from "../entities/Neighborhood";

class NeighborhoodsRepository implements INeighborhoodsRepository {
  private repository: Repository<Neighborhood>;

  constructor() {
    this.repository = dataSource.getRepository(Neighborhood);
  }

  async create({
    id,
    neighborhood,
    city,
    state,
    area,
  }: ICreateNeighborhoodDTO): Promise<Neighborhood> {
    const neighbor = this.repository.create({
      id,
      neighborhood,
      city,
      state,
      area,
    });

    const alreadyExist = await this.repository.findOneBy({
      neighborhood,
      city,
      state,
    });

    if (!alreadyExist) {
      const res = await this.repository.save(neighbor);

      return res;
    }
  }

  async findById(id: string): Promise<Neighborhood> {
    const neighbor = await this.repository.findOneBy({ id });

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

  async getAllNeighborhoods(): Promise<Neighborhood[]> {
    const allNeighborhoods = await this.repository.find();

    return allNeighborhoods;
  }

  async neighborAlreadyExist({
    neighborhood,
    city,
    state,
  }: {
    neighborhood: string;
    city: string;
    state: string;
  }): Promise<boolean> {
    const neighbor = await this.repository.findOneBy({
      neighborhood,
      city,
      state,
    });

    const alreadyExist = !isEmpty(neighbor);

    return alreadyExist;
  }
}

export { NeighborhoodsRepository };
