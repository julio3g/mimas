import { Request, Response } from 'express';
import { ListBrandsUseCase } from './ListBrandsUseCase';

export class ListBrandsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listBrandsUseCase = new ListBrandsUseCase();
    const all = await listBrandsUseCase.execute();
    return response.json(all);
  }
}
