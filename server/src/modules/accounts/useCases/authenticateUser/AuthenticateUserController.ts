import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, phone, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const token = await authenticateUserUseCase.execute({
      password,
      phone,
      email,
    });
    return response.json(token);
  }
}
