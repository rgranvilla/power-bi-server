import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("competitors_infos_average_flow")
class AverageFlow {
  @PrimaryColumn()
  id: string;

  @Column()
  competitor_info_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { AverageFlow };
