import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("flow_events")
class FlowEvent {
  @PrimaryColumn()
  id: string;

  @Column()
  competitor_id: string;

  @Column()
  event_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { FlowEvent };
