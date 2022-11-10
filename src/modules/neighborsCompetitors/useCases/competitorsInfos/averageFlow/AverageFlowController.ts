import { Request, Response } from "express";
import { container } from "tsyringe";

import { AverageFlowUseCase } from "./AverageFlowUseCase";

class AverageFlowController {
  async handle(request: Request, response: Response): Promise<Response> {
    const averageFlowUseCase = container.resolve(AverageFlowUseCase);

    const res = await averageFlowUseCase.execute();

    return response.status(201).send(res);
  }
}

export { AverageFlowController };
