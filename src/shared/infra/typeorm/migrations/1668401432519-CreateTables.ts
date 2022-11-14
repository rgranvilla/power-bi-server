import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTables1668401432519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "neighborhood",
        columns: [
          {
            name: "neighborhood_id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "population_id",
            type: "varchar",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "name",
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
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "population",
        columns: [
          {
            name: "population_id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "neighborhood_id",
            type: "varchar",
            isUnique: true,
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
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "competitor",
        columns: [
          {
            name: "competitor_id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "neighborhood_id",
            type: "varchar",
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
            name: "address",
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
            name: "price_range",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "flow_event",
        columns: [
          {
            name: "flow_event_id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "competitor_id",
            type: "varchar",
          },
          {
            name: "event_date",
            type: "varchar",
          },
          {
            name: "weekday",
            type: "varchar",
          },
          {
            name: "day_period",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "population",
      new TableForeignKey({
        name: "FKNeighborhoodPopulation",
        referencedTableName: "neighborhood",
        referencedColumnNames: ["neighborhood_id"],
        columnNames: ["neighborhood_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "competitor",
      new TableForeignKey({
        name: "FKNeighborhoodCompetitor",
        referencedTableName: "neighborhood",
        referencedColumnNames: ["neighborhood_id"],
        columnNames: ["neighborhood_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "flow_event",
      new TableForeignKey({
        name: "FKCompetitorFlowEvent",
        referencedTableName: "competitor",
        referencedColumnNames: ["competitor_id"],
        columnNames: ["competitor_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("flow_event", "FKCompetitorFlowEvent");
    await queryRunner.dropForeignKey("competitor", "FKNeighborhoodCompetitor");
    await queryRunner.dropForeignKey("population", "FKNeighborhoodPopulation");

    await queryRunner.dropTable("flow_event");
    await queryRunner.dropTable("competitor");
    await queryRunner.dropTable("population");
    await queryRunner.dropTable("neighborhood");
  }
}
