import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { Competitor } from "./Competitor";

@Entity("flow_event")
class FlowEvent {
  @PrimaryColumn()
  flow_event_id: string;

  @Column()
  competitor_id: string;

  @Column()
  event_date: Date;

  @Column()
  weekday: string;

  @Column()
  day_period: string;

  @ManyToOne(() => Competitor, (competitor) => competitor.competitor_id)
  @JoinColumn({ name: "competitor_id" })
  competitor_info: Competitor;

  @CreateDateColumn()
  created_at: Date;
}

export { FlowEvent };
