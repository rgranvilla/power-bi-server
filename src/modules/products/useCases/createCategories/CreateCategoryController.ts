import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, parent_title, indentation, icon_url, image_url, priority } =
      request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({
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
