import { Repository } from "typeorm";

import { ICreateNeighborCompetitorDTO } from "@modules/neighborsCompetitors/dtos/ICreateNeighborCompetitorDTO";
import { INeighborsCompetitorsRepository } from "@modules/neighborsCompetitors/repositories/INeighborsCompetitorsRepository";
import dataSource from "@shared/infra/typeorm";

import { NeighborCompetitor } from "../entities/NeighborCompetitor";

class NeighborsCompetitorsRepository
  implements INeighborsCompetitorsRepository
{
  private repository: Repository<NeighborCompetitor>;

  constructor() {
    this.repository = dataSource.getRepository(NeighborCompetitor);
  }

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
    const competitor = this.repository.create({
      id,
      competitor_name,
      category,
      price_range,
      address,
      city,
      state,
      neighborhood_id,
    });

    const res = await this.repository.save(competitor);

    return res;
  }

  async findById(id: string): Promise<NeighborCompetitor> {
    const competitor = await this.repository.findOneBy({ id });

    return competitor;
  }

  async findByCompetitor(competitor_name: string): Promise<NeighborCompetitor> {
    const competitor = await this.repository.findOneBy({
      competitor_name,
    });

    return competitor;
  }

  async findByCategory(category: string): Promise<NeighborCompetitor[]> {
    const competitors = await this.repository.find({
      where: {
        category,
      },
    });

    return competitors;
  }

  async findByPriceRange(price_range: string): Promise<NeighborCompetitor[]> {
    const competitors = await this.repository.find({
      where: {
        price_range,
      },
    });

    return competitors;
  }

  async getAllCompetitors(): Promise<NeighborCompetitor[]> {
    const allCompetitors = await this.repository.find();

    return allCompetitors;
  }
}

export { NeighborsCompetitorsRepository };
