import { INeighborhoodDTO } from "../dtos/INeighborhoodDTO";
import { Neighborhood } from "../infra/typeorm/entities/Neighborhood";

type FindNeighborhoodType = {
  neighborhood: string;
  city: string;
  state: string;
};

interface INeighborhoodsRepository {
  create({
    id,
    neighborhood_id,
    neighborhood,
    city,
    state,
    area,
  }: INeighborhoodDTO): Promise<Neighborhood>;
  findByNeighborhoodId(neighborhood_id: string): Promise<Neighborhood>;
  findNeighborhood({
    neighborhood,
    city,
    state,
  }: FindNeighborhoodType): Promise<Neighborhood>;
  getAllNeighborhoods(): Promise<Neighborhood[]>;
  neighborAlreadyExist({
    neighborhood,
    city,
    state,
  }: FindNeighborhoodType): Promise<boolean>;
}

export type { INeighborhoodsRepository };
