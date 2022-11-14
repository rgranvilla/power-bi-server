import { isEmpty } from "lodash";
import { Repository } from "typeorm";

import { INeighborhoodDTO } from "@modules/neighborhoods/dtos/INeighborhoodDTO";
import {
  INeighborhoodsRepository,
  IPaginateNeighbors,
} from "@modules/neighborhoods/repositories/INeighborhoodsRepository";
import dataSource from "@shared/infra/typeorm";

import { Neighborhood } from "../entities/Neighborhood";

class NeighborhoodsRepository implements INeighborhoodsRepository {
  private repository: Repository<Neighborhood>;

  constructor() {
    this.repository = dataSource.getRepository(Neighborhood);
  }

  async create({
    neighborhood_id,
    name,
    city,
    state,
    area,
  }: INeighborhoodDTO): Promise<Neighborhood> {
    const neighbor = this.repository.create({
      neighborhood_id,
      name,
      city,
      state,
      area,
    });

    const alreadyExist = await this.neighborAlreadyExist({
      name,
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
    name,
    city,
    state,
  }: {
    name: string;
    city: string;
    state: string;
  }): Promise<Neighborhood> {
    const neighbor = await this.repository.findOneBy({
      name,
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
    name,
    city,
    state,
  }: {
    name: string;
    city: string;
    state: string;
  }): Promise<boolean> {
    const neighbor = await this.repository.findOneBy({
      name,
      city,
      state,
    });

    const alreadyExist = !isEmpty(neighbor);

    return alreadyExist;
  }

  async getPaginateNeighborhoods({
    page,
    take,
    orderDirection,
  }: IPaginateNeighbors): Promise<Neighborhood[]> {
    const competitors = await this.repository
      .createQueryBuilder("neighborhoods")
      .orderBy("neighborhoods.name", orderDirection)
      .leftJoinAndSelect("neighborhoods.population", "population")
      .skip(page)
      .take(take)
      .getMany();

    return competitors;
  }
}

export { NeighborhoodsRepository };
