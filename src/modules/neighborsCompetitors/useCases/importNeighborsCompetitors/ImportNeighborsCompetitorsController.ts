import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportNeighborsCompetitorsUseCase } from "./ImportNeighborsCompetitorsUseCase";

class ImportNeighborsCompetitorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importNeighborsCompetitorsUseCase = container.resolve(
      ImportNeighborsCompetitorsUseCase
    );

    await importNeighborsCompetitorsUseCase.execute(file);

    return response.status(201).send({ message: "Competitors created" });
  }
}

export { ImportNeighborsCompetitorsController };
