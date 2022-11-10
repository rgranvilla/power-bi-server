import { inject, injectable } from "tsyringe";

import { AverageFlow } from "@modules/neighborsCompetitors/infra/typeorm/entities/AverageFlow";
import { IAverageFlowRepository } from "@modules/neighborsCompetitors/repositories/IAverageFlowRepository";

@injectable()
class AverageFlowUseCase {
  private averageFlow: AverageFlow[] = [];

  constructor(
    @inject("AverageFlowRepository")
    private averageFlowRepository: IAverageFlowRepository
  ) {}

  async execute(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { AverageFlowUseCase };
