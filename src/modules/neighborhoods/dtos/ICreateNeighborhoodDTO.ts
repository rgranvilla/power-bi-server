interface ICreateNeighborhoodDTO {
  id?: string;
  neighborhood: string;
  city: string;
  state: string;
  area?: number;
}

export type { ICreateNeighborhoodDTO };
