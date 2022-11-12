import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1668275234491 implements MigrationInterface {
  name = "CreateTables1668275234491";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "flow_events" ("id" character varying NOT NULL, "event_date" TIMESTAMP NOT NULL, "weekday" character varying NOT NULL, "day_period" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "competitorInfoId" character varying, CONSTRAINT "PK_d410ec6bfcc93e47c2e31c7583b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "neighborhoods_competitors" ("id" character varying NOT NULL, "competitor_name" character varying NOT NULL, "category" character varying NOT NULL, "price_range" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "neighborhood_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "neighborhoodId" uuid, CONSTRAINT "PK_b726a4801149d97d5f7cb29457b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "populations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "population" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "neighborhoodId" uuid, CONSTRAINT "REL_b01d7ff86c5647b166ff95264e" UNIQUE ("neighborhoodId"), CONSTRAINT "PK_f4f0fe60e53063b8be35f2bdd2e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "neighborhoods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "neighborhood_id" character varying NOT NULL, "neighborhood" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "area" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_249f3b7c3601adff79e56fa36f6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "flow_events" ADD CONSTRAINT "FK_3488b4800052642fa9e6b538b18" FOREIGN KEY ("competitorInfoId") REFERENCES "neighborhoods_competitors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "neighborhoods_competitors" ADD CONSTRAINT "FK_dc752d149b52ea0bbdff60d0169" FOREIGN KEY ("neighborhoodId") REFERENCES "neighborhoods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "populations" ADD CONSTRAINT "FK_b01d7ff86c5647b166ff95264e7" FOREIGN KEY ("neighborhoodId") REFERENCES "neighborhoods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "populations" DROP CONSTRAINT "FK_b01d7ff86c5647b166ff95264e7"`
    );
    await queryRunner.query(
      `ALTER TABLE "neighborhoods_competitors" DROP CONSTRAINT "FK_dc752d149b52ea0bbdff60d0169"`
    );
    await queryRunner.query(
      `ALTER TABLE "flow_events" DROP CONSTRAINT "FK_3488b4800052642fa9e6b538b18"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"`
    );
    await queryRunner.query(`DROP TABLE "neighborhoods"`);
    await queryRunner.query(`DROP TABLE "populations"`);
    await queryRunner.query(`DROP TABLE "neighborhoods_competitors"`);
    await queryRunner.query(`DROP TABLE "flow_events"`);
  }
}
