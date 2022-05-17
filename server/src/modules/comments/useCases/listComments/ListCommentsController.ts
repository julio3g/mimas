import { Request, Response } from 'express';
import { ListCommentsUseCase } from './ListCommentsUseCase';
export class ListCommentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCommentsUseCase = new ListCommentsUseCase();
    const all = await listCommentsUseCase.execute();
    return response.json(all);
  }
}
