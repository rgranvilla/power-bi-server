import { Repository } from "typeorm";

import { ICreateFlowEventDTO } from "@modules/neighborsCompetitors/dtos/ICreateFlowEventDTO";
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
    competitor_id,
    event_date,
  }: ICreateFlowEventDTO): Promise<FlowEvent> {
    const flowEventAlreadyExist = await this.repository.findOneBy({
      id,
      competitor_id,
      event_date,
    });

    if (!flowEventAlreadyExist) {
      const flowEvent = this.repository.create({
        id,
        competitor_id,
        event_date,
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
