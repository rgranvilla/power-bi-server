import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportNeighborhoodsUseCase } from "./ImportNeighborhoodsUseCase";

class ImportNeighborhoodsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importNeighborhoodsUseCase = container.resolve(
      ImportNeighborhoodsUseCase
    );

    await importNeighborhoodsUseCase.execute(file);

    return response.status(201).send({ message: "Neighborhoods created" });
  }
}

export { ImportNeighborhoodsController };
