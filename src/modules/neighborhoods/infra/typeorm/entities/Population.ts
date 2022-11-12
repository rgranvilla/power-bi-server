import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Neighborhood } from "./Neighborhood";

@Entity("populations")
class Population {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Neighborhood, (neighbor) => neighbor.neighbor_population)
  @JoinColumn()
  neighborhood: Neighborhood;

  @Column()
  population: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Population };
