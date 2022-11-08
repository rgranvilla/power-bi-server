import { ICreateNeighborhoodDTO } from "@modules/neighborhoods/dtos/ICreateNeighborhoodDTO";
import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";

import { INeighborhoodRepository } from "../INeighborhoodRepository";

class NeighborhoodRepositoryInMemory implements INeighborhoodRepository {
  neighborhoods: Neighborhood[] = [];

  async create({
    code,
    neighborhood,
    city,
    state,
    area,
  }: ICreateNeighborhoodDTO): Promise<Neighborhood> {
    const neighbor = new Neighborhood();

    Object.assign(neighbor, {
      code,
      neighborhood,
      city,
      state,
      area,
    });

    this.neighborhoods.push(neighbor);

    return neighbor;
  }

  async findById(id: string): Promise<Neighborhood> {
    return this.neighborhoods.find((neighbor) => neighbor.id === id);
  }

  async findByNeighborhood(neighborhood: string): Promise<Neighborhood[]> {
    return this.neighborhoods.filter(
      (entitie) => entitie.neighborhood === neighborhood
    );
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
    return this.neighborhoods.find(
      (entitie) =>
        entitie.neighborhood === neighborhood &&
        entitie.city === city &&
        entitie.state === state
    );
  }

  async findNeighborhoodsByCity({
    city,
    state,
  }: {
    city: string;
    state: string;
  }): Promise<Neighborhood[]> {
    return this.neighborhoods.filter(
      (entitie) => entitie.city === city && entitie.state === state
    );
  }
}

export { NeighborhoodRepositoryInMemory };
