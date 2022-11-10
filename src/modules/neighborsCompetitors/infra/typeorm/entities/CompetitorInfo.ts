import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("competitors_infos")
class CompetitorInfo {
  @PrimaryColumn()
  id: string;

  @Column()
  competitor_id: string;

  @Column()
  competitor_name: string;

  @Column()
  address: string;

  @Column()
  price_range: string;

  @Column()
  neighborhood: string;

  @Column()
  population: string;

  @Column()
  demographic_density: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { CompetitorInfo };
