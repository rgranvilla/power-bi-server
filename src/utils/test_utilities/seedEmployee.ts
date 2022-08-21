import { hash } from "bcrypt";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

async function seedAdminEmployee(connection: Connection): Promise<void> {
  const id = uuidV4();
  const password = await hash("admin", 8);
  // Initialization employee admin
  await connection.query(
    `
      INSERT INTO employees(id, first_name, last_name, position, username, avatar, access_level, email, password, leader_username, gender, birthday, hire_date, created_at, updated_at )
      values('${id}', 'John', 'Doe', 'TI Admin', 'John', '', 0, 'johndoe@mail.com', '${password}', 'Boss', 'male', 'now()', 'now()', 'now()', 'now()')
      `
  );
}

export { seedAdminEmployee };
