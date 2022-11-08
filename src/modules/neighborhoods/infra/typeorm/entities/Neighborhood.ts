import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("neighborhoods")
class Neighborhood {
  @PrimaryColumn()
  id?: string;

  @Column()
  code: string;

  @Column()
  neighborhood: string;
  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  area: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Neighborhood };
