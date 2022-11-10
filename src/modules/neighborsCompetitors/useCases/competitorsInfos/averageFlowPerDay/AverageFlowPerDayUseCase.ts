import { inject, injectable } from "tsyringe";

import { IAverageFlowPerDayRepository } from "@modules/neighborsCompetitors/repositories/IAverageFlowPerDayRepository";

@injectable()
class AverageFlowPerDay {
  private AverageFlowPerDay: AverageFlowPerDay[] = [];

  constructor(
    @inject("AverageFlowPerDayRepository")
    private averageFlowPerDayRepository: IAverageFlowPerDayRepository
  ) {}

  async execute(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { AverageFlowPerDay };
