import { Request, Response } from "express";
import { container } from "tsyringe";

import { User } from "../../../infra/typeorm/entities/User";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;

    try {
      const createUsersUseCase = container.resolve(CreateUserUseCase);

      const user = await createUsersUseCase.execute({
        username,
        email,
        password,
      });

      const res: Omit<
        User,
        "password" | "created_at" | "updated_at" | "avatar"
      > = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      return response.status(201).json({ ...res });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}

export { CreateUserController };
