import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompetitors1667876047922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "neighborhoods_competitors",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "competitor_name",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "price_range",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
            isNullable: true,
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
            name: "neighborhood_id",
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
            name: "FKNeighborhoodCompetitor",
            referencedTableName: "neighborhoods",
            referencedColumnNames: ["id"],
            columnNames: ["neighborhood_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("neighborhoods_competitors");
  }
}
