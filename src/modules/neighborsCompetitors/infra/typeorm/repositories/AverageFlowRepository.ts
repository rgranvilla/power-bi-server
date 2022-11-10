import { Repository } from "typeorm";

import { ICreateAverageFlowDTO } from "@modules/neighborsCompetitors/dtos/ICreateAverageFlowDTO";
import { IAverageFlowRepository } from "@modules/neighborsCompetitors/repositories/IAverageFlowRepository";
import dataSource from "@shared/infra/typeorm";

import { AverageFlow } from "../entities/AverageFlow";

class AverageFlowRepository implements IAverageFlowRepository {
  private repository: Repository<AverageFlow>;

  constructor() {
    this.repository = dataSource.getRepository(AverageFlow);
  }

  async create({
    id,
    competitor_info_id,
  }: ICreateAverageFlowDTO): Promise<string> {
    const averageFlow = this.repository.create({
      id,
      competitor_info_id,
    });

    const { id: average_flow_id } = await this.repository.save(averageFlow);

    return average_flow_id;
  }

  async findById(id: string): Promise<AverageFlow> {
    const averageFlow = await this.repository.findOneBy({ id });

    return averageFlow;
  }

  async findIdByCompetitorInfoId(competitor_info_id: string): Promise<string> {
    const competitorInfoId = await this.repository.findOneBy({
      competitor_info_id,
    });

    const { id } = competitorInfoId;

    return id;
  }
}

export { AverageFlowRepository };
