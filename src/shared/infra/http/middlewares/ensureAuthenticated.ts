import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { EmployeesRepository } from "@modules/accounts/infra/typeorm/repositories/EmployeesRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: employee_id } = verify(token, auth.secret_token) as IPayload;

    const employeesRepository = new EmployeesRepository();

    const employee = employeesRepository.findById(employee_id);

    if (!employee) {
      throw new AppError("Employee does not exists!");
    }

    request.user = {
      id: employee_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
