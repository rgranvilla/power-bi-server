import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { NeighborCompetitor } from "@modules/neighborsCompetitors/infra/typeorm/entities/NeighborCompetitor";

import { Population } from "./Population";

@Entity("neighborhoods")
class Neighborhood {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  neighborhood_id: string;

  @OneToOne(() => Population, (population) => population.neighborhood, {
    eager: true,
    cascade: true,
  })
  neighbor_population: Population;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  area: string;

  @OneToMany(() => NeighborCompetitor, (competitor) => competitor.neighborhood)
  neighbor_competitors: NeighborCompetitor[];

  @CreateDateColumn()
  created_at: Date;
}

export { Neighborhood };
