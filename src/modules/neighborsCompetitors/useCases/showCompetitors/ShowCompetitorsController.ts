import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowCompetitorsUseCase } from "./ShowCompetitorsUseCase";

class ShowCompetitorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showCompetitorsUseCase = container.resolve(ShowCompetitorsUseCase);

    const competitors = await showCompetitorsUseCase.execute();

    return response.status(201).send(competitors);
  }
}

export { ShowCompetitorsController };
