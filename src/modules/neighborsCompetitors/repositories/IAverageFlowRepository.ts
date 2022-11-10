import { ICreateAverageFlowDTO } from "../dtos/ICreateAverageFlowDTO";
import { AverageFlow } from "../infra/typeorm/entities/AverageFlow";

interface IAverageFlowRepository {
  create({ id, competitor_info_id }: ICreateAverageFlowDTO): Promise<string>;
  findById(id: string): Promise<AverageFlow>;
  findIdByCompetitorInfoId(competitor_info_id: string): Promise<string>;
}

export { IAverageFlowRepository };
