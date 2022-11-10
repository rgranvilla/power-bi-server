import { ICreateNeighborCompetitorDTO } from "@modules/neighborsCompetitors/dtos/ICreateNeighborCompetitorDTO";
import { NeighborCompetitor } from "@modules/neighborsCompetitors/infra/typeorm/entities/NeighborCompetitor";

import { INeighborsCompetitorsRepository } from "../INeighborsCompetitorsRepository";

class NeighborsCompetitorsRepositoryInMemory
  implements INeighborsCompetitorsRepository
{
  competitors: NeighborCompetitor[] = [];

  async create({
    id,
    competitor_name,
    category,
    price_range,
    address,
    city,
    state,
    neighborhood_id,
  }: ICreateNeighborCompetitorDTO): Promise<NeighborCompetitor> {
    const competitor = new NeighborCompetitor();

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

  async findById(id: string): Promise<NeighborCompetitor> {
    return this.competitors.find((competitor) => competitor.id === id);
  }

  async findByCompetitor(competitor_name: string): Promise<NeighborCompetitor> {
    return this.competitors.find(
      (competitor) => competitor.competitor_name === competitor_name
    );
  }

  async findByCategory(category: string): Promise<NeighborCompetitor[]> {
    return this.competitors.filter(
      (entities) => entities.category === category
    );
  }

  async findByPriceRange(price_range: string): Promise<NeighborCompetitor[]> {
    return this.competitors.filter(
      (entities) => entities.price_range === price_range
    );
  }
}

export { NeighborsCompetitorsRepositoryInMemory };
