import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFile {
  fileName: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const images = request.files as IFile[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map(file => file.fileName);

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarImageController };
