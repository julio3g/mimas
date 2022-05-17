import { inject, injectable } from 'tsyringe';
import { prisma } from '@database/prismaClient';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';
interface IUploadToolImage {
  tool_id: string;
  image_name: string;
}
@injectable()
export class UploadToolImageUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ tool_id, image_name }: IUploadToolImage) {
    await prisma.toolsImage.create({ data: { tool_id, image_name } });
    await this.storageProvider.save(image_name, 'tools');
  }
  // async execute({ tool_id, image_name }: IUploadToolImage) {
  //   image_name.map(async (image) => {
  //     await prisma.toolsImage.create({
  //       data: { tool_id, image_name: image },
  //     });
  //     await this.storageProvider.save(image, 'tools');
  //   });
  // }
}
