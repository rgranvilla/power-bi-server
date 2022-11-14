import { Competitor } from "../infra/typeorm/entities/Competitor";

interface IFlowEventDTO {
  flow_event_id: string;
  competitor_id: string;
  event_date: Date;
  weekday: string;
  day_period: "morning" | "afternoon" | "night";
  competitor_info: Competitor;
}

export type { IFlowEventDTO };
