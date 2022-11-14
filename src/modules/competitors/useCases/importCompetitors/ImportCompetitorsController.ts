import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCompetitorsUseCase } from "./ImportCompetitorsUseCase";

class ImportCompetitorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importNeighborsCompetitorsUseCase = container.resolve(
      ImportCompetitorsUseCase
    );

    await importNeighborsCompetitorsUseCase.execute(file);

    return response.status(201).send({ message: "Competitors created" });
  }
}

export { ImportCompetitorsController };
