interface IPeriodType {
  manhã: number;
  tarde: number;
  noite: number;
}

interface IWeekdayType {
  "segunda-feira": IPeriodType;
  "terça-feira": IPeriodType;
  "quarta-feira": IPeriodType;
  "quinta-feira": IPeriodType;
  "sexta-feira": IPeriodType;
  sábado: IPeriodType;
  domingo: IPeriodType;
}

interface IResponseDTO {
  cod_concorrente: string;
  nome_concorrente: string;
  endereço: string;
  preco_praticado: string;
  fluxo_medio: IWeekdayType;
  bairro: string;
  populacão: string;
  densidade: string;
}

export { IResponseDTO };
