import { Request, Response } from 'express';
import { UpdateToolUseCase } from './UpdateToolUseCase';

export class UpdateToolController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, amount, brand_id } = request.body;
    const updateToolUseCase = new UpdateToolUseCase();
    const result = await updateToolUseCase.execute({
      id,
      name,
      amount,
      brand_id,
    });
    return response.json(result);
  }
}
