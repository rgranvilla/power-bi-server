import { NeighborCompetitor } from "../infra/typeorm/entities/NeighborCompetitor";

interface IFlowEventDTO {
  id?: string;
  event_date: Date;
  weekday: string;
  day_period: "morning" | "afternoon" | "night";
  competitor_info: NeighborCompetitor;
}

export type { IFlowEventDTO };
