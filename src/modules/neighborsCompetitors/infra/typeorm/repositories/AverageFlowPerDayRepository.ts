import { Repository } from "typeorm";

import { ICreateAverageFlowPerDayDTO } from "@modules/neighborsCompetitors/dtos/ICreateAverageFlowPerDayDTO";
import { IAverageFlowPerDayRepository } from "@modules/neighborsCompetitors/repositories/IAverageFlowPerDayRepository";
import dataSource from "@shared/infra/typeorm";

import { AverageFlowPerDay } from "../entities/AverageFlowPerDay";

class AverageFlowPerDayRepository implements IAverageFlowPerDayRepository {
  private repository: Repository<AverageFlowPerDay>;

  constructor() {
    this.repository = dataSource.getRepository(AverageFlowPerDay);
  }

  async create({
    id,
    competitor_info_average_flow_id,
    weekday,
    dayPeriod,
  }: ICreateAverageFlowPerDayDTO): Promise<AverageFlowPerDay> {
    const averageFlowPerDay = this.repository.create({
      id,
      competitor_info_average_flow_id,
      weekday,
      dayPeriod,
    });

    const res = await this.repository.save(averageFlowPerDay);

    return res;
  }

  async findById(id: string): Promise<AverageFlowPerDay> {
    const averageFlowPerDay = await this.repository.findOneBy({
      id,
    });

    return averageFlowPerDay;
  }
}

export { AverageFlowPerDayRepository };
