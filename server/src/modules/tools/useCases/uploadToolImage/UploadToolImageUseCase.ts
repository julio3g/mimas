import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';
import { prisma } from '@database/prismaClient';
import { inject, injectable } from 'tsyringe';

interface IUploadToolImage {
  tool_id: string;
  images_name: string[];
}

@injectable()
export class UploadToolImageUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ tool_id, images_name }: IUploadToolImage) {
    images_name.map(async (image) => {
      await prisma.toolsImage.create({
        data: { tool_id, images_name: image },
      });
      await this.storageProvider.save(image, 'tools');
    });
  }
}
