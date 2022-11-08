import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNeighborhoods1667854119167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "neighborhoods",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "code",
            type: "varchar",
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "area",
            type: "numeric",
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
    await queryRunner.dropTable("neighborhoods");
  }
}
