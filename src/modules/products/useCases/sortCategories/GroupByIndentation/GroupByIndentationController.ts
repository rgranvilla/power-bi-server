import { Request, Response } from "express";

import { GroupByIndentationUseCase } from "./GroupByIndentationUseCase";

class GroupByIndentationController {
  constructor(private groupByIndentationUseCase: GroupByIndentationUseCase) {}

  handle(request: Request, response: Response): Response {
    const sortedCategories = this.groupByIndentationUseCase.execute();

    return response.json(sortedCategories);
  }
}

export { GroupByIndentationController };
