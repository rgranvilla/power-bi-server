import { Repository } from "typeorm";

import { IFlowEventDTO } from "@modules/competitors/dtos/IFlowEventDTO";
import { IFlowEventsRepository } from "@modules/competitors/repositories/IFlowEventsRepository";
import dataSource from "@shared/infra/typeorm";

import { FlowEvent } from "../entities/FlowEvent";

class FlowEventsRepository implements IFlowEventsRepository {
  private repository: Repository<FlowEvent>;

  constructor() {
    this.repository = dataSource.getRepository(FlowEvent);
  }

  async create({
    flow_event_id,
    competitor_id,
    event_date,
    weekday,
    day_period,
    competitor_info,
  }: IFlowEventDTO): Promise<FlowEvent> {
    const flowEventAlreadyExist = await this.repository.findOneBy({
      flow_event_id,
      event_date,
    });

    if (!flowEventAlreadyExist) {
      const flowEvent = this.repository.create({
        flow_event_id,
        competitor_id,
        event_date,
        weekday,
        day_period,
        competitor_info,
      });

      const res = await this.repository.save(flowEvent);

      return res;
    }
  }

  async findById(flow_event_id: string): Promise<FlowEvent> {
    const flowEvent = await this.repository.findOneBy({ flow_event_id });

    return flowEvent;
  }

  async getAllEvents(): Promise<FlowEvent[]> {
    const res = await this.repository.find();

    return res;
  }
}

export { FlowEventsRepository };
