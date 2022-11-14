import { ICompetitorDTO } from "@modules/competitors/dtos/ICompetitorDTO";
import { Competitor } from "@modules/competitors/infra/typeorm/entities/Competitor";

import { ICompetitorsRepository } from "../ICompetitorsRepository";

class NeighborsCompetitorsRepositoryInMemory implements ICompetitorsRepository {
  competitors: Competitor[] = [];

  async create({
    id,
    competitor_name,
    category,
    price_range,
    address,
    city,
    state,
    neighborhood_id,
  }: ICompetitorDTO): Promise<Competitor> {
    const competitor = new Competitor();

    Object.assign(competitor, {
      id,
      competitor_name,
      category,
      price_range,
      address,
      city,
      state,
      neighborhood_id,
    });

    this.competitors.push(competitor);

    return competitor;
  }

  async findById(id: string): Promise<Competitor> {
    return this.competitors.find((competitor) => competitor.id === id);
  }

  async findByCompetitor(competitor_name: string): Promise<Competitor> {
    return this.competitors.find(
      (competitor) => competitor.competitor_name === competitor_name
    );
  }

  async findByCategory(category: string): Promise<Competitor[]> {
    return this.competitors.filter(
      (entities) => entities.category === category
    );
  }

  async findByPriceRange(price_range: string): Promise<Competitor[]> {
    return this.competitors.filter(
      (entities) => entities.price_range === price_range
    );
  }

  async getAllCompetitors(): Promise<Competitor[]> {
    const allCompetitors = await this.competitors;

    return allCompetitors;
  }
}

export { NeighborsCompetitorsRepositoryInMemory };
