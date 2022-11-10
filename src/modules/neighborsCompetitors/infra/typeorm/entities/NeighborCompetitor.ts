import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("neighborhoods_competitors")
class NeighborCompetitor {
  @PrimaryColumn()
  id: string;

  @Column()
  category: string;

  @Column()
  competitor_name: string;

  @Column()
  address: string;

  @Column()
  price_range: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { NeighborCompetitor };
