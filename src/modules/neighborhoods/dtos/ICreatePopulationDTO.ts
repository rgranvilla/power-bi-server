import { Neighborhood } from "../infra/typeorm/entities/Neighborhood";

interface ICreatePopulationDTO {
  id?: string;
  neighborhood: Neighborhood;
  population: string;
}

export type { ICreatePopulationDTO };
