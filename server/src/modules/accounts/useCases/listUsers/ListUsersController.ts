import { Request, Response } from 'express';
import { ListUsersUseCase } from './ListUsersUseCase';
export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = new ListUsersUseCase();
    const all = await listUsersUseCase.execute();
    return response.json(all);
  }
}
