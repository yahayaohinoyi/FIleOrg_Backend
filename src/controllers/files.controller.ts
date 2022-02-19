import FileService from '@/services/files.service';
import { NextFunction, Request, Response } from 'express';
import { FileEntity } from './../entity/files.entity';

class FilesController {
  public fileService = new FileService();

  public getFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skip = req.body.skip ? Number(req.body.skip) : 0;
      const take = req.body.take ? Number(req.body.take) : 10;
      const filterOptions = {
        prefix: req.body.prefix ? req.body.prefix : '',
        priority: req.body.priority ? req.body.priority : '',
      };

      const findAllFileData: FileEntity[] = await this.fileService.findAllFiles(skip, take, filterOptions);
      res.status(200).json({ data: findAllFileData, message: 'all files' });
    } catch (error) {
      next(error);
    }
  };
  public getAllFileFolders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileId = Number(req.params.id);
      const findAllFileData: FileEntity[] = await this.fileService.findAllFileFolders(fileId);

      res.status(200).json({ data: findAllFileData, message: 'all file folders' });
    } catch (error) {
      next(error);
    }
  };

  public getFileById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileId = Number(req.params.id);
      const findFile: FileEntity = await this.fileService.findFile(fileId);

      res.status(200).json({ data: findFile, message: 'file found' });
    } catch (error) {
      next(error);
    }
  };

  public createFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileData = req.body;
      const createFileData: FileEntity = await this.fileService.createFile(fileData);

      res.status(201).json({ data: createFileData, message: 'file created' });
    } catch (error) {
      next(error);
    }
  };

  public updateFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileData = req.body;
      const fileId = Number(req.params.id);
      const updateFileData: FileEntity = await this.fileService.updateFileProperty(fileId, fileData);

      res.status(200).json({ data: updateFileData, message: 'file data updated' });
    } catch (error) {
      next(error);
    }
  };

  public downLoadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileId = Number(req.params.id);
      const downLoadedFile: FileEntity = await this.fileService.downloadFile(fileId);

      res.status(200).json({ data: downLoadedFile, message: 'file downloaded' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileId = Number(req.params.id);
      const deleteFileData: FileEntity = await this.fileService.deleteFile(fileId);

      res.status(200).json({ data: deleteFileData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFileFromDrive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileId = Number(req.params.id);
      const deleteFileData: FileEntity = await this.fileService.deleteFileFromDrive(fileId);

      res.status(200).json({ data: deleteFileData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default FilesController;
