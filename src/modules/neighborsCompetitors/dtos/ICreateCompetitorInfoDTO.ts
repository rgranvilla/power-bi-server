interface ICreateCompetitorInfoDTO {
  id?: string;
  competitor_id: string;
  competitor_name: string;
  address: string;
  price_range: string;
  neighborhood: string;
  population: string;
  demographic_density: string;
}

export { ICreateCompetitorInfoDTO };
