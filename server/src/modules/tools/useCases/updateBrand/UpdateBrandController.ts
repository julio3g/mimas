import { Request, Response } from 'express';
import { UpdateBrandUseCase } from './UpdateBrandUseCase';
export class UpdateBrandController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    const updateBrandUseCase = new UpdateBrandUseCase();
    const result = await updateBrandUseCase.execute({ id, name });
    return response.json(result);
  }
}
