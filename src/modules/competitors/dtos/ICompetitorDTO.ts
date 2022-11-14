import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";

import { FlowEvent } from "../infra/typeorm/entities/FlowEvent";

interface ICompetitorDTO {
  competitor_id: string;
  neighborhood_id: string;
  competitor_name: string;
  category: string;
  address?: string;
  city?: string;
  state?: string;
  price_range: string;
  neighborhood?: Neighborhood;
  flow_events?: FlowEvent[];
}

export type { ICompetitorDTO };
