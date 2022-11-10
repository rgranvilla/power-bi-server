import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("population")
class Population {
  @PrimaryColumn()
  id: string;

  @Column()
  neighborhood_id: string;

  @Column()
  population: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Population };
