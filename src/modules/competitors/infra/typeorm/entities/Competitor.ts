import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";

import { FlowEvent } from "./FlowEvent";

@Entity("competitor")
class Competitor {
  @PrimaryColumn()
  competitor_id: string;

  @Column()
  neighborhood_id: string;

  @Column()
  competitor_name: string;

  @Column()
  category: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  price_range: string;

  @ManyToOne(() => Neighborhood, (neighbor) => neighbor.neighborhood_id, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "neighborhood_id" })
  neighborhood: Neighborhood;

  @OneToMany(() => FlowEvent, (flowEvents) => flowEvents.competitor_info, {
    eager: true,
    cascade: true,
  })
  flow_events: FlowEvent[];

  @CreateDateColumn()
  created_at: Date;
}

export { Competitor };
