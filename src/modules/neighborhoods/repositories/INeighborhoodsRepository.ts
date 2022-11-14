import { INeighborhoodDTO } from "../dtos/INeighborhoodDTO";
import { Neighborhood } from "../infra/typeorm/entities/Neighborhood";

type FindNeighborhoodType = {
  name: string;
  city: string;
  state: string;
};

interface IPaginateNeighbors {
  page: number;
  take: number;
  orderDirection: "ASC" | "DESC";
}

interface INeighborhoodsRepository {
  create({
    neighborhood_id,
    name,
    city,
    state,
    area,
  }: INeighborhoodDTO): Promise<Neighborhood>;
  findByNeighborhoodId(neighborhood_id: string): Promise<Neighborhood>;
  findNeighborhood({
    name,
    city,
    state,
  }: FindNeighborhoodType): Promise<Neighborhood>;
  getAllNeighborhoods(): Promise<Neighborhood[]>;
  neighborAlreadyExist({
    name,
    city,
    state,
  }: FindNeighborhoodType): Promise<boolean>;
  getPaginateNeighborhoods({
    page,
    take,
    orderDirection,
  }: IPaginateNeighbors): Promise<Neighborhood[]>;
}

export type {
  INeighborhoodsRepository,
  FindNeighborhoodType,
  IPaginateNeighbors,
};
