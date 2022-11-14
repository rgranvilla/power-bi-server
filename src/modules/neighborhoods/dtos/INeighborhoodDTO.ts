import { Competitor } from "@modules/competitors/infra/typeorm/entities/Competitor";

import { Population } from "../infra/typeorm/entities/Population";

interface INeighborhoodDTO {
  neighborhood_id: string;
  population_id?: string;
  name: string;
  city: string;
  state: string;
  area: string;
  population?: Population;
  competitors?: Competitor[];
}

export type { INeighborhoodDTO };
