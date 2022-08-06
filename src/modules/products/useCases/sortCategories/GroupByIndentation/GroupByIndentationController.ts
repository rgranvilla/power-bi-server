import { Request, Response } from "express";
import { container } from "tsyringe";

import { GroupByIndentationUseCase } from "./GroupByIndentationUseCase";

class GroupByIndentationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const groupByIndentationUseCase = container.resolve(
      GroupByIndentationUseCase
    );
    const sortedCategories = await groupByIndentationUseCase.execute();

    return response.json(sortedCategories);
  }
}

export { GroupByIndentationController };
