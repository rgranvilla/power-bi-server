import { Request, Response } from "express";
import { container } from "tsyringe";

import { CompetitorsInfosUseCase } from "./CompetitorsInfosUseCase";

class CompetitorsInfosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const competitorsInfosUseCase = container.resolve(CompetitorsInfosUseCase);

    const res = await competitorsInfosUseCase.execute();

    return response.status(201).send(res);
  }
}

export { CompetitorsInfosController };
