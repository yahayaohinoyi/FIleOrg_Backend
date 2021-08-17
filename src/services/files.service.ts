import { HttpException } from '@exceptions/HttpException';
import { getRepository } from 'typeorm';
import GoogleDriveApiUtil from '../utils/drive/googleDrive';
import { FileEntity } from './../entity/files.entity';

class FileService {
  public files = FileEntity;
  public driveApi = new GoogleDriveApiUtil();

  public async findAllFiles(skip: number, take: number, filterOptions: any): Promise<FileEntity[]> {
    const fileRepository = getRepository(this.files)
      .createQueryBuilder('file')
      .skip(skip)
      .take(take)
      .leftJoinAndSelect('file.createdBy', 'user')
      .leftJoinAndSelect('file.priority', 'priority');

    if (filterOptions.priority) {
      fileRepository.where('priority = :priority', { priority: filterOptions.priority });
    }

    if (filterOptions.prefix) {
      fileRepository.where('file.title like :title', { title: `%${filterOptions.prefix}%` });
    }
    const fileRepoResult = fileRepository.getMany();

    return fileRepoResult;
  }

  public async findFile(fileId: number): Promise<FileEntity> {
    const fileRepository = getRepository(this.files)
      .createQueryBuilder('file')
      .leftJoinAndSelect('file.createdBy', 'user')
      .leftJoinAndSelect('file.priority', 'priority')
      .where('file.id = :id', { id: fileId })
      .getOne();
    return fileRepository;
  }

  public async downloadFile(fileId: number): Promise<any> {
    try {
      const fileRepository = getRepository(this.files);

      const file = await fileRepository.findOne(fileId);

      if (!file) throw new HttpException(400, 'This file does not exist');

      const fileDownload = await this.driveApi.generatePublicUrl(file.document_id);

      await fileRepository.update(fileId, { downloadCount: file.downloadCount + 1 });

      return { webContentLink: fileDownload.webContentLink, webViewLink: fileDownload.webViewLink };
    } catch (err) {
      throw new HttpException(400, err.message);
    }
  }

  public async createFile(fileData: any): Promise<FileEntity> {
    const fileRepository = getRepository(this.files);
    const driveFile = await this.driveApi.uploadFile(fileData.path);

    const newFile = new FileEntity();

    newFile.title = fileData.title;
    newFile.description = fileData.description;
    newFile.document_id = driveFile.id;
    newFile.downloadCount = 0;

    const file = await fileRepository.save(newFile);
    return file;
  }

  public async updateFileProperty(fileId: number, fileData: any): Promise<FileEntity> {
    const fileRepository = getRepository(this.files);
    const file = await fileRepository.findOne(Number(fileId));
    if (!file) throw new HttpException(400, 'This file does not exist');

    await fileRepository.update(fileId, { ...fileData });

    const fileResponse = await fileRepository.findOne(Number(fileId));

    return fileResponse;
  }

  public async deleteFile(fileId: number): Promise<FileEntity> {
    const fileRepository = getRepository(this.files);
    const file = await fileRepository.findOne(fileId);
    if (!file) throw new HttpException(400, 'This file does not exist');
    await fileRepository.delete(file.id);
    return file;
  }

  public async deleteFileFromDrive(fileId: number): Promise<FileEntity> {
    const fileRepository = getRepository(this.files);
    const file = await fileRepository.findOne(fileId);
    if (!file) throw new HttpException(400, 'This file does not exist');
    this.driveApi.deleteFile(file.document_id);
    await fileRepository.delete(file.id);
    return file;
  }
}

export default FileService;
