import { DataSource, ViewColumn, ViewEntity } from "typeorm";

import { EventPerDay } from "./EventPerDay";
import { FlowEvent } from "./FlowEvent";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("flow_event.competitor_id", "competitor_id")
      .addSelect("flow_event.weekday = '0'", "domingo")
      .addSelect("flow_event.weekday = '1'", "segunda-feira")
      .addSelect("flow_event.weekday = '2'", "terça-feira")
      .addSelect("flow_event.weekday = '3'", "quarta-feira")
      .addSelect("flow_event.weekday = '4'", "quinta-feira")
      .addSelect("flow_event.weekday = '5'", "sexta-feira")
      .addSelect("flow_event.weekday = '6'", "sábado")
      .from(FlowEvent, "flow_event"),
})
export class AverageFlow {
  @ViewColumn()
  competitor_id: string;

  @ViewColumn()
  "segunda-feira": EventPerDay;

  @ViewColumn()
  "terça-feira": EventPerDay;

  @ViewColumn()
  "quarta-feira": EventPerDay;

  @ViewColumn()
  "quinta-feira": EventPerDay;

  @ViewColumn()
  "sexta-feira": EventPerDay;

  @ViewColumn()
  "sábado": EventPerDay;

  @ViewColumn()
  domingo: EventPerDay;
}
