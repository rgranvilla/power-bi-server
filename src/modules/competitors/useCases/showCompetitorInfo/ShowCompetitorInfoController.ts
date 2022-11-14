import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowCompetitorInfoUseCase } from "./ShowCompetitorInfoUseCase";

class ShowCompetitorInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { competitor_name } = request.body;
    const showCompetitorInfoUseCase = container.resolve(
      ShowCompetitorInfoUseCase
    );

    const competitorInfo = await showCompetitorInfoUseCase.execute({
      competitor_name,
    });

    return response.status(201).send(competitorInfo);
  }
}

export { ShowCompetitorInfoController };
