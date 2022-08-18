import { Request, Response } from "express";
import { container } from "tsyringe";

import { GroupByCategoryLevelUseCase } from "./GroupByCategoryLevelUseCase";

class GroupByCategoryLevelController {
  async handle(request: Request, response: Response): Promise<Response> {
    const groupByIndentationUseCase = container.resolve(
      GroupByCategoryLevelUseCase
    );
    const sortedCategories = await groupByIndentationUseCase.execute();

    return response.json(sortedCategories);
  }
}

export { GroupByCategoryLevelController };
