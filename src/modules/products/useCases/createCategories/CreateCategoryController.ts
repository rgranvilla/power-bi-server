import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { title, parentTitle, indentation, icon, image, priority } =
      request.body;

    this.createCategoryUseCase.execute({
      title,
      parentTitle,
      indentation,
      icon,
      image,
      priority,
    });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
