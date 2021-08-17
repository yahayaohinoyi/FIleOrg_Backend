import PriorityController from '@/controllers/priorities.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import { CreatePriorityDto } from './../dtos/priorities.dto';

class PrioritiesRoute implements Routes {
  public path = '/priorities';
  public router = Router();
  public prioritiesController = new PriorityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.prioritiesController.getPriorities);
    this.router.get(`${this.path}/:id(\\d+)`, this.prioritiesController.getPriorityById);
    this.router.post(`${this.path}`, validationMiddleware(CreatePriorityDto, 'body'), this.prioritiesController.createPriority);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreatePriorityDto, 'body', true), this.prioritiesController.updatePriority);
    this.router.delete(`${this.path}/:id(\\d+)`, this.prioritiesController.deletePriority);
  }
}

export default PrioritiesRoute;
