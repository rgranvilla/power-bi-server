import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFlowEvents1668012079639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "flow_events",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "competitor_id",
            type: "varchar",
          },
          {
            name: "event_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCompetitorFlowEvents",
            referencedTableName: "neighborhoods_competitors",
            referencedColumnNames: ["id"],
            columnNames: ["competitor_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("flow_events");
  }
}
