import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import { Competitor } from "@modules/competitors/infra/typeorm/entities/Competitor";

import { Population } from "./Population";

@Entity("neighborhood")
class Neighborhood {
  @PrimaryColumn()
  neighborhood_id: string;

  @Column()
  population_id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  area: string;

  @OneToOne(() => Population, (population) => population.population_id, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "population_id" })
  population: Population;

  @OneToMany(() => Competitor, (competitor) => competitor.neighborhood)
  competitors: Competitor[];

  @CreateDateColumn()
  created_at: Date;
}

export { Neighborhood };
