import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("employees")
class Employees {
  @PrimaryColumn()
  id?: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  position: string;

  @Column()
  username: string;

  @Column()
  access_level: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  leader_id: string;

  @Column()
  gender: string;

  @Column()
  birthday: Date;

  @Column()
  hire_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Employees };
