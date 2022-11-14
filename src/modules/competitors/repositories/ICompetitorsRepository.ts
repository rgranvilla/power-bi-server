import { ICompetitorDTO } from "../dtos/ICompetitorDTO";
import { Competitor } from "../infra/typeorm/entities/Competitor";
import { ViewCompetitorInfo } from "../infra/typeorm/entities/ViewCompetitorInfo";

interface IPaginateData {
  page: number;
  take: number;
  orderDirection: "ASC" | "DESC";
}
interface ICompetitorsRepository {
  create({
    competitor_id,
    competitor_name,
    category,
    price_range,
    address,
    city,
    state,
    neighborhood_id,
  }: ICompetitorDTO): Promise<Competitor>;
  findById(competitor_id: string): Promise<Competitor>;
  findByCompetitor(competitor_name: string): Promise<ViewCompetitorInfo>;
  findByCategory(category: string): Promise<Competitor[]>;
  findByPriceRange(price_range: string): Promise<Competitor[]>;
  getAllCompetitors(): Promise<Competitor[]>;
  getPaginateCompetitors({
    page,
    take,
    orderDirection,
  }: IPaginateData): Promise<Competitor[]>;
  getFlows(competitor_id: string): Promise<Competitor>;
}

export type { ICompetitorsRepository, IPaginateData };
