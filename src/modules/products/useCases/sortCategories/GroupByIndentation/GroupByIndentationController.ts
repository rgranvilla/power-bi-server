import { Request, Response } from "express";

import { GroupByIndentationUseCase } from "./GroupByIndentationUseCase";

class GroupByIndentationController {
  constructor(private groupByIndentationUseCase: GroupByIndentationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const sortedCategories = await this.groupByIndentationUseCase.execute();

    return response.json(sortedCategories);
  }
}

export { GroupByIndentationController };
