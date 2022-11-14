import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportFlowEventsUseCase } from "./ImportFlowEventsUseCase";

class ImportFlowEventsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importFlowEventsUseCase = container.resolve(ImportFlowEventsUseCase);

    await importFlowEventsUseCase.execute(file);

    return response.status(201).send({ message: "Flow Events created" });
  }
}

export { ImportFlowEventsController };
