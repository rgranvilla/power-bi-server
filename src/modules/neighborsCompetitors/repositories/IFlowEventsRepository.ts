import { ICreateFlowEventDTO } from "../dtos/ICreateFlowEventDTO";
import { FlowEvent } from "../infra/typeorm/entities/FlowEvent";

interface IFlowEventsRepository {
  create({
    id,
    competitor_id,
    event_date,
  }: ICreateFlowEventDTO): Promise<FlowEvent>;
  findById(id: string): Promise<FlowEvent>;
  getAllEvents(): Promise<FlowEvent[]>;
}

export { IFlowEventsRepository };
