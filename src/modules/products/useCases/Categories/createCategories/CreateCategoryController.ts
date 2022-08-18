import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, parent_title, category_level, icon_url } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({
      title,
      parent_title,
      category_level,
      icon_url,
    });

    return response.status(201).json({ message: "Category created" });
  }
}

export { CreateCategoryController };
