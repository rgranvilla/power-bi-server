import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateEmployeeUseCase } from "./AuthenticateEmployeeUseCase";

class AuthenticateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;

    const authenticateEmployeeUseCase = container.resolve(
      AuthenticateEmployeeUseCase
    );

    const employeeInfo = await authenticateEmployeeUseCase.execute({
      username,
      email,
      password,
    });

    return response.status(201).json(employeeInfo);
  }
}

export { AuthenticateEmployeeController };
