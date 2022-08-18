import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateEmployeesUseCase } from "./CreateEmployeesUseCase";

class CreateEmployeesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      first_name,
      last_name,
      position,
      username,
      access_level,
      email,
      password,
      leader_username,
      gender,
      birthday,
      hire_date,
    } = request.body;

    const createEmployeesUseCase = container.resolve(CreateEmployeesUseCase);

    await createEmployeesUseCase.execute({
      first_name,
      last_name,
      position,
      username,
      access_level,
      email,
      password,
      leader_username,
      gender,
      birthday,
      hire_date,
    });

    return response.status(201).json({ message: "Employees created" });
  }
}

export { CreateEmployeesController };
