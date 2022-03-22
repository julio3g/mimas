import { Request, Response } from 'express';
import { UpdateCommentUseCase } from './UpdateCommentUseCase';

export class UpdateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { comment } = request.body;
    const updateCommentUseCase = new UpdateCommentUseCase();
    const result = await updateCommentUseCase.execute({ id, comment });
    return response.json(result);
  }
}
