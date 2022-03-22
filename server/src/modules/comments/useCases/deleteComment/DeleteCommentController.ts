import { Request, Response } from 'express';
import { DeleteCommentUseCase } from './DeleteCommentUseCase';

export class DeleteCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCommentUseCase = new DeleteCommentUseCase();
    await deleteCommentUseCase.execute(id);
    return response.status(201).send();
  }
}
