import { ICreatePopulationDTO } from "../dtos/ICreatePopulationDTO";
import { Population } from "../infra/typeorm/entities/Population";

interface IPopulationRepository {
  create({
    id,
    neighborhood_id,
    population,
  }: ICreatePopulationDTO): Promise<Population>;
  findById(id: string): Promise<Population>;
  findPopulationByNeighborhoodId(neighborId: string): Promise<number>;
}

export { IPopulationRepository };
