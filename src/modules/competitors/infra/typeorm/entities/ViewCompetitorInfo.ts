import { DataSource, ViewColumn, ViewEntity } from "typeorm";

import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { Population } from "@modules/neighborhoods/infra/typeorm/entities/Population";

import { Competitor } from "./Competitor";

@ViewEntity({
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
class ViewCompetitorInfo {
  @ViewColumn()
  cod_concorrente: string;

  @ViewColumn()
  nome_concorrente: string;

  @ViewColumn()
  endereço: string;

  @ViewColumn()
  preco_praticado: string;

  @ViewColumn()
  bairro: string;

  @ViewColumn()
  população: string;

  @ViewColumn()
  densidade: string;
}

export { ViewCompetitorInfo };
