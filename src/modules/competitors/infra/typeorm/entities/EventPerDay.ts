import { DataSource, ViewColumn, ViewEntity } from "typeorm";

import { FlowEvent } from "./FlowEvent";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("flow_event.competitor_id", "competitor_id")
      .addSelect("flow_event.day_period = 'morning'", "manhã")
      .addSelect("flow_event.day_period = 'afternoon'", "tarde")
      .addSelect("flow_event.day_period = 'night'", "noite")
      .from(FlowEvent, "flow_event"),
})
export class EventPerDay {
  @ViewColumn()
  manhã: string;

  @ViewColumn()
  tarde: string;

  @ViewColumn()
  noite: string;
}
