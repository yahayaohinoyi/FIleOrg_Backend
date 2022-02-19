import FolderController from '@/controllers/folders.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import { CreateFolderDto } from './../dtos/folders.dto';

class FolderRoute implements Routes {
  public path = '/folders';
  public router = Router();
  public foldersController = new FolderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.foldersController.getFolders);
    this.router.get(`${this.path}/:id(\\d+)`, this.foldersController.getFolderById);
    this.router.post(`${this.path}`, validationMiddleware(CreateFolderDto, 'body'), this.foldersController.createFolder);
    this.router.post(`${this.path}/addFileToFolder`, this.foldersController.addFileToFolder);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateFolderDto, 'body', true), this.foldersController.updateFolder);
    this.router.delete(`${this.path}/deleteFileFromFolder`, this.foldersController.deleteFileFromFolder);
    this.router.delete(`${this.path}/:id(\\d+)`, this.foldersController.deleteFolder);
  }
}

export default FolderRoute;
