import { Request, Response } from 'express';
import { ListToolsUseCase } from './ListToolsUseCase';

export class ListToolsController {
  tool: any;
  async handle(request: Request, response: Response): Promise<Response> {
    const listToolsUseCase = new ListToolsUseCase();
    const all = await listToolsUseCase.execute();
    switch (process.env.disk) {
      case 'local':
        return response.json(
          all.map((tool) => {
            return {
              ...tool,
              toolsImage: tool.toolsImage.map((toolImage) => ({
                ...toolImage,
                url: `${process.env.APP_API_URL}/tools/${toolImage.images_name[0]}`,
              })),
            };
          }),
        );
      case 's3':
        return response.json(
          all.map((tool) => {
            return {
              ...tool,
              toolsImage: tool.toolsImage.map((toolImage) => ({
                ...toolImage,
                url: `${process.env.AWS_ACCESS_URL}/tools/${toolImage.images_name[0]}`,
              })),
            };
          }),
        );
      default:
        return response.json(all);
    }
  }
}
