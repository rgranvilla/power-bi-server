import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowNeighborhoodByNameUseCase } from "./ShowNeighborhoodByNameUseCase";

class ShowNeighborhoodByNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, city, state } = request.body;

    const showNeighborhoodByNameUseCase = container.resolve(
      ShowNeighborhoodByNameUseCase
    );

    const competitors = await showNeighborhoodByNameUseCase.execute({
      name,
      city,
      state,
    });

    return response.status(201).send(competitors);
  }
}

export { ShowNeighborhoodByNameController };
