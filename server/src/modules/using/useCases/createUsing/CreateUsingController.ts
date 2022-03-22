import { Request, Response } from 'express';
import { CreateUsingUseCase } from './CreateUsingUseCase';

export class CreateUsingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { tool_id } = request.body;
    const createUsingUseCase = new CreateUsingUseCase();
    await createUsingUseCase.execute({ user_id: id, tool_id });
    return response.status(201).send();
  }
}
