interface ICreateNeighborhoodDTO {
  id?: string;
  code: string;
  neighborhood: string;
  city: string;
  state: string;
  area: number;
}

export type { ICreateNeighborhoodDTO };
