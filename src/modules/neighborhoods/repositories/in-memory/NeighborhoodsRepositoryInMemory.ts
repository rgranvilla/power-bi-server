import { INeighborhoodDTO } from "@modules/neighborhoods/dtos/INeighborhoodDTO";
import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";

import {
  FindNeighborhoodType,
  INeighborhoodsRepository,
} from "../INeighborhoodsRepository";

class NeighborhoodsRepositoryInMemory implements INeighborhoodsRepository {
  neighborhoods: Neighborhood[] = [];

  async create({
    neighborhood_id,
    name,
    city,
    state,
    area,
  }: INeighborhoodDTO): Promise<Neighborhood> {
    const neighbor = new Neighborhood();

    Object.assign(neighbor, {
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
      this.neighborhoods.push(neighbor);

      return neighbor;
    }
  }

  async findByNeighborhoodId(neighborhood_id: string): Promise<Neighborhood> {
    const neighbor = this.neighborhoods.find(
      (entitie) => entitie.neighborhood_id === neighborhood_id
    );

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
    const neighbor = this.neighborhoods.find(
      (entitie) =>
        entitie.name === name &&
        entitie.city === city &&
        entitie.state === state
    );

    return neighbor;
  }

  async getAllNeighborhoods(): Promise<Neighborhood[]> {
    return this.neighborhoods;
  }

  async neighborAlreadyExist({
    name,
    city,
    state,
  }: FindNeighborhoodType): Promise<boolean> {
    const alreadyExist = !!this.neighborhoods.find(
      (entitie) =>
        entitie.name === name &&
        entitie.city === city &&
        entitie.state === state
    );

    return alreadyExist;
  }
}

export { NeighborhoodsRepositoryInMemory };
