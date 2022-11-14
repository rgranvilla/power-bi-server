import { Neighborhood } from "../infra/typeorm/entities/Neighborhood";

interface IPopulationDTO {
  population_id: string;
  neighborhood_id: string;
  population: string;
  demographic_density: string;
  neighborhood: Neighborhood;
}

export type { IPopulationDTO };
