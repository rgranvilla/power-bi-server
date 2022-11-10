import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportNeighborPopulationsUseCase } from "./importNeighborPopulationsUseCase";

class ImportNeighborPopulationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importNeighborPopulationsUseCase = container.resolve(
      ImportNeighborPopulationsUseCase
    );

    await importNeighborPopulationsUseCase.execute(file);

    return response
      .status(201)
      .send({ message: "Neighbors Populations created" });
  }
}

export { ImportNeighborPopulationsController };
