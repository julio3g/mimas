import { Request, Response } from 'express';
import { DeleteToolImageUseCase } from './DeleteToolImageUseCase';

export class DeleteToolImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteToolImageUseCase = new DeleteToolImageUseCase();
    await deleteToolImageUseCase.execute(id);
    return response.status(201).send();
  }
}
