import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmployees1660845497881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "employees",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "first_name",
            type: "varchar",
          },
          {
            name: "last_name",
            type: "varchar",
          },
          {
            name: "position",
            type: "varchar",
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "access_level",
            type: "numeric",
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
            name: "leader_id",
            type: "varchar",
          },
          {
            name: "gender",
            type: "varchar",
          },
          {
            name: "birthday",
            type: "timestamp",
          },
          {
            name: "hire_date",
            type: "timestamp",
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
    await queryRunner.dropTable("employees");
  }
}
