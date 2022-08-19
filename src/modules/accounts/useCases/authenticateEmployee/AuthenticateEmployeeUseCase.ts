import { compare } from "bcrypt";
import auth from "config/auth";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  username?: string;
  email?: string;
  password: string;
}

interface IResponse {
  employee: {
    username: string;
    first_name: string;
    last_name: string;
    position: string;
    access_level: number;
    leader_username: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute({ username, email, password }: IRequest): Promise<IResponse> {
    const employee = await this.employeesRepository.findByEmployees({
      username,
      email,
    });

    if (!employee) {
      throw new AppError("Incorrect input data!");
    }

    const passwordMatch = await compare(password, employee.password);

    if (!passwordMatch) {
      throw new AppError("Username, email or password incorrect!");
    }

    const token = sign({}, auth.secret_token, {
      subject: employee.id,
      expiresIn: "1d",
    });

    const tokenResponse: IResponse = {
      token,
      employee: {
        username: employee.username,
        first_name: employee.first_name,
        last_name: employee.last_name,
        position: employee.position,
        access_level: employee.access_level,
        leader_username: employee.leader_username,
        email: employee.email,
      },
    };

    return tokenResponse;
  }
}

export { AuthenticateEmployeeUseCase };
