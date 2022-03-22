import { Request, Response } from 'express';
import { DeleteToolUseCase } from './DeleteToolUseCase';

export class DeleteToolController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteToolUseCase = new DeleteToolUseCase();
    await deleteToolUseCase.execute(id);
    return response.status(201).send();
  }
}
