import { Connection } from "typeorm";

async function seedRootCategory(connection: Connection): Promise<void> {
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('623f42c2-ace8-4db1-8b9c-606dd54cf569', 'Root', '00000000-0000-0000-0000-000000000000', 'null', 0, 'null', 'root', 'now()', 'now()')
    `
  );
}

async function seedCategories(connection: Connection): Promise<void> {
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('ab95b3ea-6d9e-4bfe-8af1-4dca668fecec', 'Category 1', '623f42c2-ace8-4db1-8b9c-606dd54cf569', 'Root', 1, 'null', 'category_1', 'now()', 'now()')
    `
  );
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('583d79d9-5ff2-40a1-9689-6001f321736b', 'Category 2', '623f42c2-ace8-4db1-8b9c-606dd54cf569', 'Root', 1, 'null', 'category_2', 'now()', 'now()')
    `
  );
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('0c5d77bb-cdb1-402c-8558-f5c5788df364', 'Category 3', '623f42c2-ace8-4db1-8b9c-606dd54cf569', 'Root', 1, 'null', 'category_3', 'now()', 'now()')
    `
  );
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('a889493f-65a9-4dee-9657-daffb3c1043d', 'Category 1_1', 'ab95b3ea-6d9e-4bfe-8af1-4dca668fecec', 'Category 1', 2, 'null', 'category_1_1', 'now()', 'now()')
    `
  );
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('02aaa479-f420-4b64-abb4-c4feeeafc1d4', 'Category 1_2', 'ab95b3ea-6d9e-4bfe-8af1-4dca668fecec', 'Category 1', 2, 'null', 'category_1_2', 'now()', 'now()')
    `
  );
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('479d562d-f228-41b2-9085-f4483356f984', 'Category 2_1', '583d79d9-5ff2-40a1-9689-6001f321736b', 'Category 2', 2, 'null', 'category_2_1', 'now()', 'now()')
    `
  );
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('6460b5bc-f333-4858-a349-65d1cd56e9a2', 'Category 2_2', '583d79d9-5ff2-40a1-9689-6001f321736b', 'Category 2', 2, 'null', 'category_2_2', 'now()', 'now()')
    `
  );
  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('4186e0ed-4d5e-41dc-8dbc-45aff6bef1c2', 'Category 1_1_1', 'a889493f-65a9-4dee-9657-daffb3c1043d', 'Category 1_1', 3, 'null', 'category_1_1_1', 'now()', 'now()')
    `
  );
}

export { seedRootCategory, seedCategories };
