import { Repository } from "typeorm";

import {
  ICompetitorsRepository,
  IPaginateData,
} from "@modules/competitors/repositories/ICompetitorsRepository";
import dataSource from "@shared/infra/typeorm";

import { Competitor } from "../entities/Competitor";
import { ViewCompetitorInfo } from "../entities/ViewCompetitorInfo";

class CompetitorsRepository implements ICompetitorsRepository {
  private repository: Repository<Competitor>;

  constructor() {
    this.repository = dataSource.getRepository(Competitor);
  }

  async getPaginateCompetitors({
    page,
    take,
    orderDirection,
  }: IPaginateData): Promise<Competitor[]> {
    const competitors = await this.repository
      .createQueryBuilder("competitors")
      .orderBy("competitors.competitor_name", orderDirection)
      .leftJoinAndSelect("competitors.flow_events", "competitor_info")
      .skip(page)
      .take(take)
      .getMany();

    return competitors;
  }

  async create({
    competitor_id,
    competitor_name,
    category,
    price_range,
    address,
    city,
    state,
    neighborhood_id,
    neighborhood,
  }: Competitor): Promise<Competitor> {
    const alreadyExist = await this.findById(competitor_id);

    if (!alreadyExist) {
      const competitor = this.repository.create({
        competitor_id,
        competitor_name,
        category,
        price_range,
        address,
        city,
        state,
        neighborhood_id,
        neighborhood,
      });

      const res = await this.repository.save(competitor);

      return res;
    }
  }

  async findById(competitor_id: string): Promise<Competitor> {
    const competitor = await this.repository.findOneBy({ competitor_id });

    return competitor;
  }

  async findByCompetitor(competitor_name: string): Promise<ViewCompetitorInfo> {
    const competitor = await dataSource.manager.findOneBy(ViewCompetitorInfo, {
      nome_concorrente: competitor_name,
    });

    return competitor;
  }

  async findByCategory(category: string): Promise<Competitor[]> {
    const competitors = await this.repository.find({
      where: {
        category,
      },
    });

    return competitors;
  }

  async findByPriceRange(price_range: string): Promise<Competitor[]> {
    const competitors = await this.repository.find({
      where: {
        price_range,
      },
    });

    return competitors;
  }

  async getAllCompetitors(): Promise<Competitor[]> {
    const allCompetitors = await this.repository.find();

    return allCompetitors;
  }

  async getFlows(competitor_id: string): Promise<Competitor> {
    const flow = await this.repository
      .createQueryBuilder("competitor")
      .leftJoinAndSelect("competitor.flow_events", "competitor_info")
      .where("competitor.competitor_id = :competitor_id", { competitor_id })
      .getOne();

    return flow;
  }
}

export { CompetitorsRepository };
