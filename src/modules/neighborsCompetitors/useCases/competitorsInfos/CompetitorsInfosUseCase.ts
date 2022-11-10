import { inject, injectable } from "tsyringe";

import { CompetitorsInfosRepository } from "@modules/neighborsCompetitors/infra/typeorm/repositories/CompetitorsInfosRepository";
import { ICompetitorsInfosRepository } from "@modules/neighborsCompetitors/repositories/ICompetitorsInfosRepository";

@injectable()
class CompetitorsInfosUseCase {
  private repository: CompetitorsInfosRepository[] = [];

  constructor(
    @inject("CompetitorsInfosRepository")
    private competitorsInfos: ICompetitorsInfosRepository
  ) {}

  async execute(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { CompetitorsInfosUseCase };
