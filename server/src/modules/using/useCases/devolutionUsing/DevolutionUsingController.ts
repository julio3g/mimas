import { Request, Response } from 'express';
import { DevolutionUsingUseCase } from './DevolutionUsingUseCase';

export class DevolutionUsingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;
    const devolutionUsingUseCase = new DevolutionUsingUseCase();
    const using = await devolutionUsingUseCase.execute({ id, user_id });
    return response.status(200).json(using);
  }
}
