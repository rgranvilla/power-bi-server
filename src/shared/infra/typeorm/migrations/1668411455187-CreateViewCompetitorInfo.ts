import { DataSource, MigrationInterface, QueryRunner } from "typeorm";
import { View } from "typeorm/schema-builder/view/View";

import { Competitor } from "@modules/competitors/infra/typeorm/entities/Competitor";
import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { Population } from "@modules/neighborhoods/infra/typeorm/entities/Population";

export class CreateViewCompetitorInfo1668411455187
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createView(
      new View({
        name: "view_competitor_info",
        expression: (dataSource: DataSource) =>
          dataSource
            .createQueryBuilder()
            .select("competitor.competitor_name", "competitor_name")
            .addSelect("competitor.competitor_id", "cod_concorrente")
            .addSelect("competitor.competitor_name", "nome_concorrente")
            .addSelect("competitor.address", "endereço")
            .addSelect("competitor.price_range", "preco_praticado")
            .addSelect("neighborhood.name", "bairro")
            .addSelect("population.population", "população")
            .addSelect("population.demographic_density", "densidade")
            .from(Competitor, "competitor")
            .leftJoin(
              Neighborhood,
              "neighborhood",
              "neighborhood.neighborhood_id = competitor.neighborhood_id"
            )
            .leftJoin(
              Population,
              "population",
              "population.neighborhood_id = competitor.neighborhood_id"
            ),
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropView("view_competitor_info");
  }
}
