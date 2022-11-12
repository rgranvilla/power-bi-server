import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";

import { FlowEvent } from "../infra/typeorm/entities/FlowEvent";

interface INeighborCompetitorDTO {
  id?: string;
  flow_events?: FlowEvent[];
  competitor_name: string;
  category: string;
  price_range: string;
  address?: string;
  city?: string;
  state?: string;
  neighborhood_id: string;
  neighborhood?: Neighborhood;
}

export type { INeighborCompetitorDTO };
