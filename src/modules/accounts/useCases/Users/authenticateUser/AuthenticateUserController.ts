import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../../shared/errors/AppErrors";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email || !password)
      throw new AppError("Email and password fields are required!", 422);

    try {
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const userInfo = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.status(200).json(userInfo);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export { AuthenticateUserController };
