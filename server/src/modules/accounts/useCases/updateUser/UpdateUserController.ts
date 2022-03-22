import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateUserUseCase = new UpdateUserUseCase();
    const result = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
    });

    return response.json(result);
  }
}
