import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1667854012016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
