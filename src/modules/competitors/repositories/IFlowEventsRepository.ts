import { IFlowEventDTO } from "../dtos/IFlowEventDTO";
import { FlowEvent } from "../infra/typeorm/entities/FlowEvent";

interface IFlowEventsRepository {
  create({
    flow_event_id,
    competitor_id,
    event_date,
    weekday,
    day_period,
    competitor_info,
  }: IFlowEventDTO): Promise<FlowEvent>;
  findById(flow_event_id: string): Promise<FlowEvent>;
  getAllEvents(): Promise<FlowEvent[]>;
}

export { IFlowEventsRepository };
