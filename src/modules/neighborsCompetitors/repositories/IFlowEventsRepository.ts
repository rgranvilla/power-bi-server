import { IFlowEventDTO } from "../dtos/IFlowEventDTO";
import { FlowEvent } from "../infra/typeorm/entities/FlowEvent";

interface IFlowEventsRepository {
  create({
    id,
    event_date,
    weekday,
    day_period,
    competitor_info,
  }: IFlowEventDTO): Promise<FlowEvent>;
  findById(id: string): Promise<FlowEvent>;
  getAllEvents(): Promise<FlowEvent[]>;
}

export { IFlowEventsRepository };
