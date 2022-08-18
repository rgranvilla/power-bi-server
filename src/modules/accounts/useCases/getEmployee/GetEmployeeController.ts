import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetEmployeeUseCase } from "./GetEmployeeUseCase";

class GetEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email } = request.body;
    console.log(username, email);

    const getEmployeeUseCase = container.resolve(GetEmployeeUseCase);

    const employee = await getEmployeeUseCase.execute({ username, email });

    return response.status(201).json(employee);
  }
}

export { GetEmployeeController };
