import { Request, Response } from 'express';
import { CreateToolUseCase } from './CreateToolUseCase';
export class CreateToolController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, amount, brand_id } = request.body;
    const createToolUseCase = new CreateToolUseCase();
    await createToolUseCase.execute({ name, amount, brand_id });
    return response.status(201).send();
  }
}
