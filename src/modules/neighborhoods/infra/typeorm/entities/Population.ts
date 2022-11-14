import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import { Neighborhood } from "./Neighborhood";

@Entity("population")
class Population {
  @PrimaryColumn()
  population_id: string;

  @Column()
  neighborhood_id: string;

  @Column()
  population: string;

  @Column()
  demographic_density: string;

  @OneToOne(() => Neighborhood, (neighbor) => neighbor.neighborhood_id)
  @JoinColumn({ name: "neighborhood_id" })
  neighborhood: Neighborhood;

  @CreateDateColumn()
  created_at: Date;
}

export { Population };
