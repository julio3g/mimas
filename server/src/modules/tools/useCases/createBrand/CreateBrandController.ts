import { Request, Response } from 'express';
import { CreateBrandUseCase } from './CreateBrandUseCase';
export class CreateBrandController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createBrandUseCase = new CreateBrandUseCase();
    await createBrandUseCase.execute(name);
    return response.status(201).send();
  }
}
