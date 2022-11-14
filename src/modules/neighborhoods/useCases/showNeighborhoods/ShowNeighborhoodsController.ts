import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowNeighborhoodsUseCase } from "./ShowNeighborhoodsUseCase";

class ShowNeighborhoodsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, take, orderDirection } = request.body;

    const showNeighborhoodsUseCase = container.resolve(
      ShowNeighborhoodsUseCase
    );

    const competitors = await showNeighborhoodsUseCase.execute({
      page,
      take,
      orderDirection,
    });

    return response.status(201).send(competitors);
  }
}

export { ShowNeighborhoodsController };
