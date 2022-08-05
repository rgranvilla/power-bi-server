import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title, parent_title, indentation, icon_url, image_url, priority } =
      request.body;

    await this.createCategoryUseCase.execute({
      title,
      parent_title,
      indentation,
      icon_url,
      image_url,
      priority,
    });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
