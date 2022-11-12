import { NeighborCompetitor } from "@modules/neighborsCompetitors/infra/typeorm/entities/NeighborCompetitor";

import { Population } from "../infra/typeorm/entities/Population";

interface INeighborhoodDTO {
  id?: string;
  neighborhood_id: string;
  neighborhood: string;
  city: string;
  state: string;
  area: string;
  neighbor_population?: Population;
  neighbor_competitors?: NeighborCompetitor[];
}

export type { INeighborhoodDTO };
