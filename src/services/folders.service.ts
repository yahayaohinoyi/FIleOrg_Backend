import { FileEntity } from './../entity/files.entity';
import { FileFolderEntity } from './../entity/filesfolders.entity';
import { HttpException } from '@exceptions/HttpException';
import { getRepository } from 'typeorm';
import GoogleDriveApiUtil from '../utils/drive/googleDrive';
import { FolderEntity } from './../entity/folders.entity';
import { PriorityEntity } from './../entity/priorities.entity';

class FolderService {
  public folders = FolderEntity;
  public driveApi = new GoogleDriveApiUtil();

  public async findAllFolders(skip: number, take: number, filterOptions: any): Promise<FolderEntity[]> {
    const folderRepository = getRepository(this.folders)
      .createQueryBuilder('folder')
      .skip(skip)
      .take(take)
      .leftJoinAndSelect('folder.createdBy', 'user')
      .leftJoinAndSelect('folder.files', 'files')
      .leftJoinAndSelect('files.file', 'file')
      .leftJoinAndSelect('folder.priority', 'priority');

    if (filterOptions.priority) {
      folderRepository.where('priority = :priority', { priority: filterOptions.priority });
    }

    if (filterOptions.prefix) {
      folderRepository.where('folder.title like :title', { title: `%${filterOptions.prefix}%` });
    }
    const folderRepoResult = folderRepository.getMany();

    return folderRepoResult;
  }

  public async findFolder(folderId: number): Promise<FolderEntity> {
    const folder: FolderEntity = await getRepository(this.folders).findOne({ where: { id: folderId } });
    if (!folder) throw new HttpException(400, 'Folder not found');

    const folderRepository = getRepository(this.folders)
      .createQueryBuilder('folder')
      .leftJoinAndSelect('folder.createdBy', 'user')
      .leftJoinAndSelect('folder.files', 'files')
      .leftJoinAndSelect('files.file', 'file')
      .leftJoinAndSelect('folder.priority', 'priority')
      .where('folder.id = :id', { id: folderId })
      .getOne();
    return folderRepository;
  }

  public async findFilesInFolder(folderId: number): Promise<FolderEntity[]> {
    const folder: FolderEntity = await getRepository(this.folders).findOne({ where: { id: folderId } });
    if (!folder) throw new HttpException(400, 'Folder not found');

    const folderRepository = getRepository(this.folders)
      .createQueryBuilder('folder')
      .leftJoinAndSelect('folder.createdBy', 'user')
      .leftJoinAndSelect('folder.priority', 'priority')
      .leftJoinAndSelect('folder.files', 'files')
      .where('folder.id = :id', { id: folderId })
      .getMany();
    return folderRepository;
  }

  public async createFolder(folderData: any): Promise<FolderEntity> {
    const folderRepository = getRepository(this.folders);
    const driveFolder = await this.driveApi.createEmptyFolder(folderData.title);

    const newFolder = new FolderEntity();

    let priority: PriorityEntity = await getRepository(PriorityEntity).findOne({ where: { name: folderData.priority } });

    if (!priority) {
      priority = await getRepository(PriorityEntity).findOne({ where: { name: 'Low' } });
    }

    newFolder.title = folderData.title;
    newFolder.description = folderData.description;
    newFolder.folderId = driveFolder.id;
    newFolder.folderScore = 0;
    newFolder.priority = priority;

    const folder = await folderRepository.save(newFolder);
    return folder;
  }

  public async addFileToFolder(folderData: any): Promise<FileFolderEntity> {
    const folderRepository = getRepository(this.folders);

    const folder = await folderRepository.findOne(folderData.folderId);
    if (!folder) throw new HttpException(400, 'This folder does not exist');

    const file = await getRepository(FileEntity).findOne(folderData.fileId);
    if (!file) throw new HttpException(400, 'This file does not exist');

    await this.driveApi.addFileToFolder(file.document_id, folder.folderId);

    const newFolder = new FileFolderEntity();

    newFolder.file = file;
    newFolder.folder = folder;

    const folderRes = await getRepository(FileFolderEntity).save(newFolder);
    return folderRes;
  }

  public async updateFolderProperty(folderId: number, folderData: any): Promise<FolderEntity> {
    const folderRepository = getRepository(this.folders);
    const folder = await folderRepository.findOne(Number(folderId));
    if (!folder) throw new HttpException(400, 'This folder does not exist');

    await folderRepository.update(folderId, { ...folderData });

    const folderResponse = await folderRepository.findOne(Number(folderId));

    return folderResponse;
  }

  public async deleteFolder(folderId: number): Promise<FolderEntity> {
    const folderRepository = getRepository(this.folders);
    const folder = await folderRepository.findOne(folderId);
    if (!folder) throw new HttpException(400, 'This folder does not exist');
    await folderRepository.delete(folder.id);
    return folder;
  }

  public async deleteFileFromFolder(folderData: any): Promise<FileFolderEntity> {
    const folderRepository = getRepository(this.folders);

    const folder = await folderRepository.findOne(folderData.folderId);
    if (!folder) throw new HttpException(400, 'This folder does not exist');

    const file = await getRepository(FileEntity).findOne(folderData.fileId);
    if (!file) throw new HttpException(400, 'This file does not exist');

    const fileFolder = await getRepository(FileFolderEntity)
      .createQueryBuilder('fileFolder')
      .leftJoinAndSelect('fileFolder.file', 'file')
      .leftJoinAndSelect('fileFolder.folder', 'folder')
      .where('file.id = :fileId', { fileId: file.id })
      .andWhere('folder.id = :folderId', { folderId: folder.id })
      .getOne();
    if (!fileFolder) throw new HttpException(400, 'file not in folder');

    await this.driveApi.removeFileFromFolders(file.document_id, folder.folderId);

    await getRepository(FileFolderEntity).delete(fileFolder.id);
    return fileFolder;
  }

  //   public async deleteFolderFromDrive(folderId: number): Promise<FolderEntity> {
  //     const folderRepository = getRepository(this.folders);
  //     const folder = await folderRepository.findOne(folderId);
  //     if (!folder) throw new HttpException(400, 'This folder does not exist');
  //     this.driveApi.deleteFolder(folder.document_id);
  //     await folderRepository.delete(folder.id);
  //     return folder;
  //   }
}

export default FolderService;
