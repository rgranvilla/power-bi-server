import { inject, injectable } from "tsyringe";

import { ICompetitorsRepository } from "@modules/competitors/repositories/ICompetitorsRepository";

interface ITest {
  cod_concorrente: string;
  nome_concorrente: string;
  endereço: string;
  preco_praticado: string;
  bairro: string;
  população: string;
  densidade: string;
  fluxo_medio: {
    "segunda-feira": {
      manhã: number;
      tarde: number;
      noite: number;
    };
    "terça-feira": {
      manhã: number;
      tarde: number;
      noite: number;
    };
    "quarta-feira": {
      manhã: number;
      tarde: number;
      noite: number;
    };
    "quinta-feira": {
      manhã: number;
      tarde: number;
      noite: number;
    };
    "sexta-feira": {
      manhã: number;
      tarde: number;
      noite: number;
    };
    sábado: {
      manhã: number;
      tarde: number;
      noite: number;
    };
    domingo: {
      manhã: number;
      tarde: number;
      noite: number;
    };
  };
}

@injectable()
class ShowCompetitorInfoUseCase {
  constructor(
    @inject("CompetitorsRepository")
    private competitorsRepository: ICompetitorsRepository
  ) {}

  async execute({ competitor_name }): Promise<ITest> {
    const competitorInfo = await this.competitorsRepository.findByCompetitor(
      competitor_name
    );

    const flows = await this.competitorsRepository.getFlows(
      competitorInfo.cod_concorrente
    );

    const { flow_events } = flows;

    //WEEKDAYS FILTER
    const domingo = flow_events.filter((item) => item.weekday === "0");
    const segunda = flow_events.filter((item) => item.weekday === "1");
    const terça = flow_events.filter((item) => item.weekday === "2");
    const quarta = flow_events.filter((item) => item.weekday === "3");
    const quinta = flow_events.filter((item) => item.weekday === "4");
    const sexta = flow_events.filter((item) => item.weekday === "5");
    const sabado = flow_events.filter((item) => item.weekday === "6");

    const fluxo_medio = {
      "segunda-feira": {
        manhã: segunda.filter((item) => item.day_period === "morning").length,
        tarde: segunda.filter((item) => item.day_period === "afternoon").length,
        noite: segunda.filter((item) => item.day_period === "night").length,
      },
      "terça-feira": {
        manhã: terça.filter((item) => item.day_period === "morning").length,
        tarde: terça.filter((item) => item.day_period === "afternoon").length,
        noite: terça.filter((item) => item.day_period === "night").length,
      },
      "quarta-feira": {
        manhã: quarta.filter((item) => item.day_period === "morning").length,
        tarde: quarta.filter((item) => item.day_period === "afternoon").length,
        noite: quarta.filter((item) => item.day_period === "night").length,
      },
      "quinta-feira": {
        manhã: quinta.filter((item) => item.day_period === "morning").length,
        tarde: quinta.filter((item) => item.day_period === "afternoon").length,
        noite: quinta.filter((item) => item.day_period === "night").length,
      },
      "sexta-feira": {
        manhã: sexta.filter((item) => item.day_period === "morning").length,
        tarde: sexta.filter((item) => item.day_period === "afternoon").length,
        noite: sexta.filter((item) => item.day_period === "night").length,
      },
      sábado: {
        manhã: sabado.filter((item) => item.day_period === "morning").length,
        tarde: sabado.filter((item) => item.day_period === "afternoon").length,
        noite: sabado.filter((item) => item.day_period === "night").length,
      },
      domingo: {
        manhã: domingo.filter((item) => item.day_period === "morning").length,
        tarde: domingo.filter((item) => item.day_period === "afternoon").length,
        noite: domingo.filter((item) => item.day_period === "night").length,
      },
    };

    const response = {
      ...competitorInfo,
      fluxo_medio,
    };

    return response;
  }
}

export { ShowCompetitorInfoUseCase };
