import { ICreateNeighborhoodDTO } from "../dtos/ICreateNeighborhoodDTO";
import { Neighborhood } from "../infra/typeorm/entities/Neighborhood";

type FindNeighborhoodType = {
  neighborhood: string;
  city: string;
  state: string;
};

type FindNeighborhoodsByCityType = {
  city: string;
  state: string;
};

interface INeighborhoodRepository {
  create({
    id,
    code,
    neighborhood,
    city,
    state,
    area,
  }: ICreateNeighborhoodDTO): Promise<Neighborhood>;
  findById(id: string): Promise<Neighborhood>;
  findByNeighborhood(neighborhood: string): Promise<Neighborhood[]>;
  findNeighborhood({
    neighborhood,
    city,
    state,
  }: FindNeighborhoodType): Promise<Neighborhood>;
  findNeighborhoodsByCity({
    city,
    state,
  }: FindNeighborhoodsByCityType): Promise<Neighborhood[]>;
}

export type { INeighborhoodRepository };
