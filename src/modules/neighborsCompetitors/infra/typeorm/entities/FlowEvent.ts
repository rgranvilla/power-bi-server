import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { NeighborCompetitor } from "./NeighborCompetitor";

@Entity("flow_events")
class FlowEvent {
  @PrimaryColumn()
  id: string;

  @Column()
  event_date: Date;

  @Column()
  weekday: string;

  @Column()
  day_period: string;

  @ManyToOne(() => NeighborCompetitor, (competitor) => competitor.flow_events)
  competitor_info: NeighborCompetitor;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { FlowEvent };
