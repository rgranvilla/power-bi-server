import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  title: string;

  @Column()
  parent_id?: string;

  @Column()
  parent_title?: string;

  @Column()
  indentation: number;

  @Column()
  icon_url: string;

  @Column()
  image_url: string;

  @Column()
  priority: number;

  @Column()
  slug?: string;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
