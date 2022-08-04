import { Request, Response } from "express";

import { NestCategoriesUseCase } from "./NestCategoriesUseCase";

class NestCategoriesController {
  constructor(private nestCategoriesUseCase: NestCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const nestedCategories = this.nestCategoriesUseCase.execute();

    return response.json(nestedCategories);
  }
}

export { NestCategoriesController };
