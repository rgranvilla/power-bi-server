import { Repository } from "typeorm";

import { IFlowEventDTO } from "@modules/neighborsCompetitors/dtos/IFlowEventDTO";
import { IFlowEventsRepository } from "@modules/neighborsCompetitors/repositories/IFlowEventsRepository";
import dataSource from "@shared/infra/typeorm";

import { FlowEvent } from "../entities/FlowEvent";

class FlowEventsRepository implements IFlowEventsRepository {
  private repository: Repository<FlowEvent>;

  constructor() {
    this.repository = dataSource.getRepository(FlowEvent);
  }

  async create({
    id,
    event_date,
    weekday,
    day_period,
    competitor_info,
  }: IFlowEventDTO): Promise<FlowEvent> {
    const flowEventAlreadyExist = await this.repository.findOneBy({
      id,
      event_date,
    });

    console.log(competitor_info);

    if (!flowEventAlreadyExist) {
      const flowEvent = this.repository.create({
        id,
        event_date,
        weekday,
        day_period,
        competitor_info,
      });

      const res = await this.repository.save(flowEvent);

      return res;
    }
  }

  async findById(id: string): Promise<FlowEvent> {
    const flowEvent = await this.repository.findOneBy({ id });

    return flowEvent;
  }

  async getAllEvents(): Promise<FlowEvent[]> {
    const res = await this.repository.find();

    return res;
  }
}

export { FlowEventsRepository };
