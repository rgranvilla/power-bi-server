import { hash } from "bcrypt";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

async function seedAdminUser(connection: Connection): Promise<void> {
  const id = uuidV4();
  const password = await hash("admin", 8);
  // Initialization user admin
  await connection.query(
    `
      INSERT INTO users(id, username, avatar, email, password, "isAdmin", created_at)
      values('${id}', 'Admin', '', 'admin@mail.com', '${password}', true, 'now()')
      `
  );
}

export { seedAdminUser };
