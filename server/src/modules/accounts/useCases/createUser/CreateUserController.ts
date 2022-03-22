import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, password } = request.body;
    const createUserUseCase = new CreateUserUseCase();
    await createUserUseCase.execute({
      name,
      email,
      phone,
      password,
    });
    return response.status(201).send();
  }
}
