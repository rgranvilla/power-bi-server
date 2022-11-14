import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowCompetitorsUseCase } from "./ShowCompetitorsUseCase";

class ShowCompetitorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, take, orderDirection } = request.body;
    const showCompetitorsUseCase = container.resolve(ShowCompetitorsUseCase);

    const competitors = await showCompetitorsUseCase.execute({
      page,
      take,
      orderDirection,
    });

    return response.status(201).send(JSON.stringify(competitors));
  }
}

export { ShowCompetitorsController };
