import { Repository } from "typeorm";

import { ICreateCompetitorInfoDTO } from "@modules/neighborsCompetitors/dtos/ICreateCompetitorInfoDTO";
import { ICompetitorsInfosRepository } from "@modules/neighborsCompetitors/repositories/ICompetitorsInfosRepository";
import dataSource from "@shared/infra/typeorm";

import { CompetitorInfo } from "../entities/CompetitorInfo";

class CompetitorsInfosRepository implements ICompetitorsInfosRepository {
  private repository: Repository<CompetitorInfo>;

  constructor() {
    this.repository = dataSource.getRepository(CompetitorInfo);
  }

  async create({
    id,
    competitor_id,
    competitor_name,
    address,
    price_range,
    neighborhood,
    population,
    demographic_density,
  }: ICreateCompetitorInfoDTO): Promise<string> {
    const info = this.repository.create({
      id,
      competitor_id,
      competitor_name,
      address,
      price_range,
      neighborhood,
      population,
      demographic_density,
    });

    const { id: info_id } = await this.repository.save(info);

    return info_id;
  }

  async findById(id: string): Promise<CompetitorInfo> {
    const info = await this.repository.findOneBy({ id });

    return info;
  }
}

export { CompetitorsInfosRepository };
