import { ICreatePopulationDTO } from "../dtos/ICreatePopulationDTO";
import { Population } from "../infra/typeorm/entities/Population";

interface IPopulationRepository {
  create({
    population,
    neighborhood,
  }: ICreatePopulationDTO): Promise<Population>;
  getPopulations(): Promise<Population[]>;
}

export { IPopulationRepository };
