import { Request, Response } from 'express';
import { DeleteBrandUseCase } from './DeleteBrandUseCase';
export class DeleteBrandController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteBrandUseCase = new DeleteBrandUseCase();
    await deleteBrandUseCase.execute(id);
    return response.status(201).send();
  }
}
