import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateEmployeeAvatarUseCase } from "./UpdateEmployeeAvatarUseCase";

class UpdateEmployeeAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: employee_id } = request.user;
    const avatar_file = request.file.filename;

    const updateEmployeeAvatarUseCase = container.resolve(
      UpdateEmployeeAvatarUseCase
    );

    await updateEmployeeAvatarUseCase.execute({ employee_id, avatar_file });

    return response.status(200).json(avatar_file);
  }
}

export { UpdateEmployeeAvatarController };
