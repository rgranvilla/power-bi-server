import { inject, injectable } from "tsyringe";

import { Competitor } from "@modules/competitors/infra/typeorm/entities/Competitor";
import { ICompetitorsRepository } from "@modules/competitors/repositories/ICompetitorsRepository";

@injectable()
class ShowCompetitorsUseCase {
  constructor(
    @inject("CompetitorsRepository")
    private competitorsRepository: ICompetitorsRepository
  ) {}

  async execute({ page, take, orderDirection }): Promise<Competitor[]> {
    const competitors = await this.competitorsRepository.getPaginateCompetitors(
      {
        page,
        take,
        orderDirection,
      }
    );

    return competitors;
  }
}

export { ShowCompetitorsUseCase };
