import FilesController from '@/controllers/files.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import { CreateFileDto } from './../dtos/files.dto';

class FilesRoute implements Routes {
  public path = '/files';
  public router = Router();
  public filesController = new FilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.filesController.getFiles);
    this.router.get(`${this.path}/:id(\\d+)`, this.filesController.getFileById);
    this.router.get(`${this.path}/download/:id(\\d+)`, this.filesController.downLoadFile);
    this.router.post(`${this.path}`, validationMiddleware(CreateFileDto, 'body'), this.filesController.createFile);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateFileDto, 'body', true), this.filesController.updateFile);
    this.router.delete(`${this.path}/:id(\\d+)`, this.filesController.deleteFile);
    this.router.delete(`${this.path}/drive/:id(\\d+)`, this.filesController.deleteFileFromDrive);
  }
}

export default FilesRoute;
