import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("competitors_infos_average_flow_per_day")
class AverageFlowPerDay {
  @PrimaryColumn()
  id: string;

  @Column()
  competitor_info_average_flow_id: string;

  @Column()
  weekday: string;

  @Column()
  dayPeriod: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { AverageFlowPerDay };
