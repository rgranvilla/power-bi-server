import { ICreateNeighborCompetitorDTO } from "../dtos/ICreateNeighborCompetitorDTO";
import { NeighborCompetitor } from "../infra/typeorm/entities/NeighborCompetitor";

interface INeighborsCompetitorsRepository {
  create({
    id,
    competitor_name,
    category,
    price_range,
    address,
    city,
    state,
    neighborhood_id,
  }: ICreateNeighborCompetitorDTO): Promise<NeighborCompetitor>;
  findById(id: string): Promise<NeighborCompetitor>;
  findByCompetitor(competitor_name: string): Promise<NeighborCompetitor>;
  findByCategory(category: string): Promise<NeighborCompetitor[]>;
  findByPriceRange(price_range: string): Promise<NeighborCompetitor[]>;
  getAllCompetitors(): Promise<NeighborCompetitor[]>;
}

export { INeighborsCompetitorsRepository };
