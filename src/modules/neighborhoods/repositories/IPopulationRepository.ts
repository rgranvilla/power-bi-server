import { Neighborhood } from "../infra/typeorm/entities/Neighborhood";
import { Population } from "../infra/typeorm/entities/Population";

interface IPopulationCreateType {
  neighborhood_id: string;
  population: string;
  neighborhood: Neighborhood;
}
interface IPopulationRepository {
  create({
    neighborhood_id,
    population,
    neighborhood,
  }: IPopulationCreateType): Promise<Population>;
  getPopulations(): Promise<Population[]>;
}

export { IPopulationRepository };
