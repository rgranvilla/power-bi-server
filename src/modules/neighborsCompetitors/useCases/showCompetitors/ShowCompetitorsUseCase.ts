import { inject, injectable } from "tsyringe";

import { NeighborCompetitor } from "@modules/neighborsCompetitors/infra/typeorm/entities/NeighborCompetitor";
import { INeighborsCompetitorsRepository } from "@modules/neighborsCompetitors/repositories/INeighborsCompetitorsRepository";

@injectable()
class ShowCompetitorsUseCase {
  constructor(
    @inject("NeighborsCompetitorsRepository")
    private competitorsRepository: INeighborsCompetitorsRepository
  ) {}

  async execute(): Promise<NeighborCompetitor[]> {
    const competitors = await this.competitorsRepository.getAllCompetitors();

    return competitors;
  }
}

export { ShowCompetitorsUseCase };
