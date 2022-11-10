import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePopulation1668005540158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "population",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "neighborhood_id",
            type: "varchar",
          },
          {
            name: "population",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKNeighborhoodPopulation",
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
    await queryRunner.dropTable("population");
  }
}
