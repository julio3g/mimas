import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadToolImageUseCase } from './UploadToolImageUseCase';
interface IFales {
  filename: string;
}

export class UploadToolImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    // const images = request.files as IFales[];
    // const images_name = images.map((file) => file.filename);
    // const uploadToolImageUseCase = container.resolve(UploadToolImageUseCase);
    // await uploadToolImageUseCase.execute({ tool_id: id, images_name });
    const image_name = request.file.filename;
    const uploadToolImageUseCase = container.resolve(UploadToolImageUseCase);
    await uploadToolImageUseCase.execute({ tool_id: id, image_name });
    return response.status(201).send();
  }
}
