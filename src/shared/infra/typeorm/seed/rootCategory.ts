import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();

  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('${id}', 'Root', '00000000-0000-0000-0000-000000000000', 'null', 0, 'null', 'root', 'now()', 'now()')
    `
  );

  await connection.close;
}

create().then(() => console.log("Root category created!"));
