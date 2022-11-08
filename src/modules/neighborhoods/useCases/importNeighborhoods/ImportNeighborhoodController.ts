import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportNeighborhoodUseCase } from "./ImportNeighborhoodUseCase";

class ImportNeighborhoodController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importNeighborhoodUseCase = container.resolve(
      ImportNeighborhoodUseCase
    );

    await importNeighborhoodUseCase.execute(file);

    return response.status(201).send({ message: "Neighborhoods created" });
  }
}

export { ImportNeighborhoodController };
