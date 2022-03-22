import { Request, Response } from 'express';
import { ListUsingByUserUseCase } from './ListUsingByUserUseCase';

export class ListUsingByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const listUsingByUserUseCase = new ListUsingByUserUseCase();
    const using = await listUsingByUserUseCase.execute(user_id);
    return response.json(using);
  }
}
