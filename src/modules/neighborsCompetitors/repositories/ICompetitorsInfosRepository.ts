import { ICreateCompetitorInfoDTO } from "@modules/neighborsCompetitors/dtos/ICreateCompetitorInfoDTO";

import { CompetitorInfo } from "../infra/typeorm/entities/CompetitorInfo";

interface ICompetitorsInfosRepository {
  create({
    id,
    competitor_id,
    competitor_name,
    address,
    price_range,
    neighborhood,
    population,
    demographic_density,
  }: ICreateCompetitorInfoDTO): Promise<string>;
  findById(id: string): Promise<CompetitorInfo>;
}

export { ICompetitorsInfosRepository };
