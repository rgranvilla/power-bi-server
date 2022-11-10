import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompetitorsInfosAverageFlow1668028187456
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "competitors_infos_average_flow",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "competitor_info_id",
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
            name: "FKCompetitorsInfosCompetitorsInfosAverageFlow",
            referencedTableName: "competitors_infos",
            referencedColumnNames: ["id"],
            columnNames: ["competitor_info_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("competitors_infos_average_flow");
  }
}
