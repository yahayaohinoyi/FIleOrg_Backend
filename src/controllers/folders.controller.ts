import { FileFolderEntity } from './../entity/filesfolders.entity';
import FolderService from '@/services/folders.service';
import { NextFunction, Request, Response } from 'express';
import { FolderEntity } from './../entity/folders.entity';

class FoldersController {
  public folderService = new FolderService();

  public getFolders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skip = req.body.skip ? Number(req.body.skip) : 0;
      const take = req.body.take ? Number(req.body.take) : 10;
      const filterOptions = {
        prefix: req.body.prefix ? req.body.prefix : '',
        priority: req.body.priority ? req.body.priority : '',
      };

      const findAllFolderData: FolderEntity[] = await this.folderService.findAllFolders(skip, take, filterOptions);

      res.status(200).json({ data: findAllFolderData, message: 'all folders' });
    } catch (error) {
      next(error);
    }
  };

  public getFilesInFolders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const folderId = Number(req.params.id);
      const filesInFolder: FolderEntity[] = await this.folderService.findFilesInFolder(folderId);

      res.status(200).json({ data: filesInFolder, message: 'all folders' });
    } catch (error) {
      next(error);
    }
  };

  public getFolderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const folderId = Number(req.params.id);
      const findFolder: FolderEntity = await this.folderService.findFolder(folderId);

      res.status(200).json({ data: findFolder, message: 'folder found' });
    } catch (error) {
      next(error);
    }
  };

  public createFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const folderData = req.body;
      const createFolderData: FolderEntity = await this.folderService.createFolder(folderData);

      res.status(201).json({ data: createFolderData, message: 'folder created' });
    } catch (error) {
      next(error);
    }
  };

  public addFileToFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const folderData = req.body;
      const fileFolderData: FileFolderEntity = await this.folderService.addFileToFolder(folderData);

      res.status(201).json({ data: fileFolderData, message: 'file added to folder' });
    } catch (error) {
      next(error);
    }
  };

  public updateFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const folderData = req.body;
      const folderId = Number(req.params.id);
      const updateFolderData: FolderEntity = await this.folderService.updateFolderProperty(folderId, folderData);

      res.status(200).json({ data: updateFolderData, message: 'folder data updated' });
    } catch (error) {
      next(error);
    }
  };

  //   public downLoadFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     try {
  //       const folderId = Number(req.params.id);
  //       const downLoadedFolder: FolderEntity = await this.folderService.downloadFolder(folderId);

  //       res.status(200).json({ data: downLoadedFolder, message: 'folder downloaded' });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  public deleteFileFromFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const folderData = req.body;
      const deleteFolderData: FileFolderEntity = await this.folderService.deleteFileFromFolder(folderData);

      res.status(200).json({ data: deleteFolderData, message: 'file deleted from folder' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const folderId = Number(req.params.id);
      const deleteFolderData: FolderEntity = await this.folderService.deleteFolder(folderId);

      res.status(200).json({ data: deleteFolderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  //   public deleteFolderFromDrive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //     try {
  //       const folderId = Number(req.params.id);
  //       const deleteFolderData: FolderEntity = await this.folderService.deleteFolderFromDrive(folderId);

  //       res.status(200).json({ data: deleteFolderData, message: 'deleted' });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
}

export default FoldersController;
