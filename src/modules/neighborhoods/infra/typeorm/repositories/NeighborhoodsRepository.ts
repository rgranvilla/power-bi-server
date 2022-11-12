import { isEmpty } from "lodash";
import { Repository } from "typeorm";

import { INeighborhoodDTO } from "@modules/neighborhoods/dtos/INeighborhoodDTO";
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
    neighborhood_id,
    city,
    state,
    area,
  }: INeighborhoodDTO): Promise<Neighborhood> {
    const neighbor = this.repository.create({
      id,
      neighborhood,
      neighborhood_id,
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

  async findByNeighborhoodId(neighborhood_id: string): Promise<Neighborhood> {
    const neighbor = await this.repository.findOneBy({ neighborhood_id });

    return neighbor;
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
