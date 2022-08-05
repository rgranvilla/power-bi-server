import { Request, Response } from "express";

import { NestCategoriesUseCase } from "./NestCategoriesUseCase";

class NestCategoriesController {
  constructor(private nestCategoriesUseCase: NestCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const nestedCategories = await this.nestCategoriesUseCase.execute();

    return response.json(nestedCategories);
  }
}

export { NestCategoriesController };
