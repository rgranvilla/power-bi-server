import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompetitorsInfos1668027557848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "competitors_infos",
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
            name: "competitor_name",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "price_range",
            type: "varchar",
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "population",
            type: "varchar",
          },
          {
            name: "demographic_density",
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
            name: "FKCompetitorCompetitorsInfos",
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
    await queryRunner.dropTable("competitors_infos");
  }
}
