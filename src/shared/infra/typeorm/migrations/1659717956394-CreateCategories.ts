import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1659717956394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "parent_id",
            type: "uuid",
          },
          {
            name: "parent_title",
            type: "varchar",
          },
          {
            name: "category_level",
            type: "int",
          },
          {
            name: "icon_url",
            type: "varchar",
          },
          {
            name: "slug",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
