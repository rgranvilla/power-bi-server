interface ICreateNeighborCompetitorDTO {
  id?: string;
  competitor_name: string;
  category: string;
  price_range: string;
  address?: string;
  city?: string;
  state?: string;
  neighborhood_id?: string;
}

export type { ICreateNeighborCompetitorDTO };
