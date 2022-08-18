import { Request, Response } from "express";
import { container } from "tsyringe";

import { NestCategoriesUseCase } from "./NestCategoriesUseCase";

class NestCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const nestCategoriesUseCase = container.resolve(NestCategoriesUseCase);

    const nestedCategories = await nestCategoriesUseCase.execute();

    return response.json(nestedCategories);
  }
}

export { NestCategoriesController };
