import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompetitorsInfosAverageFlowPerDay1668028554570
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "competitors_infos_average_flow_per_day",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "competitor_info_average_flow_id",
            type: "varchar",
          },
          {
            name: "weekday",
            type: "numeric",
          },
          {
            name: "dayPeriod",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCompetitorsInfosAverageFlowAverageFlowPerDay",
            referencedTableName: "competitors_infos_average_flow",
            referencedColumnNames: ["id"],
            columnNames: ["competitor_info_average_flow_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("competitors_infos_average_flow_per_day");
  }
}
