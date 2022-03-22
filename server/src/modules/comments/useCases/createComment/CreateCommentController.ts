import { Request, Response } from 'express';
import { CreateCommentUseCase } from './CreateCommentUseCase';

export class CreateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { comment, tool_id } = request.body;
    const createCommentUseCase = new CreateCommentUseCase();
    await createCommentUseCase.execute({ comment, user_id: id, tool_id });
    return response.status(201).send();
  }
}
