import { prismaClient } from "../app/database";
import { ResponseError } from "../lib/error.response";
import { generateToken } from "../lib/token";
import { LoginRequest, LoginResponse, RegisterRequest, toUserResponse, UserResponse } from "../models/user.model";
import { UserValidation } from "../validation/user.validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {

  static async register(request: RegisterRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const checkEmail = await prismaClient.user.findUnique({
      where: {
        email: registerRequest.email
      }
    });

    if (checkEmail) {
      throw new ResponseError(400, "Email already registered");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest
    });

    return toUserResponse(user);
  }

  static async login(request: LoginRequest): Promise<LoginResponse> {
    const loginRequest = Validation.validate(
      UserValidation.LOGIN,
      request
    );

    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email
      }
    });

    if (!user) {
      throw new ResponseError(400, "Invalid credentials");
    }

    const isValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isValid) {
      throw new ResponseError(400, "Invalid credentials");
    }

    const token = generateToken(user);

    return {
      token
    }

  }
}