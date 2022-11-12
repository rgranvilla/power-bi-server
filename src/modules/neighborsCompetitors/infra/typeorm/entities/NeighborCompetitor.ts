import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";

import { FlowEvent } from "./FlowEvent";

@Entity("neighborhoods_competitors")
class NeighborCompetitor {
  @PrimaryColumn()
  id: string;

  @Column()
  competitor_name: string;

  @Column()
  category: string;

  @Column()
  price_range: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood_id: string;

  @ManyToOne(() => Neighborhood, (neighbor) => neighbor.neighbor_competitors, {
    eager: true,
    cascade: true,
  })
  neighborhood: Neighborhood;

  @OneToMany(() => FlowEvent, (flowEvents) => flowEvents.competitor_info, {
    eager: true,
    cascade: true,
  })
  flow_events: FlowEvent[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { NeighborCompetitor };
