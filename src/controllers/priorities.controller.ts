import PriorityService from '@/services/priorities.service';
import { NextFunction, Request, Response } from 'express';
import { PriorityEntity } from './../entity/priorities.entity';

class PriorityController {
  public priorityService = new PriorityService();

  public getPriorities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPriorityData: PriorityEntity[] = await this.priorityService.findPriorities();

      res.status(200).json({ data: findAllPriorityData, message: 'all Priorities' });
    } catch (error) {
      next(error);
    }
  };

  public getPriorityById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const priorityId = Number(req.params.id);
      const findPriority: PriorityEntity = await this.priorityService.findPriorityById(priorityId);

      res.status(200).json({ data: findPriority, message: 'priority found' });
    } catch (error) {
      next(error);
    }
  };

  public createPriority = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const priorityData = req.body;
      const createPriorityData: PriorityEntity = await this.priorityService.createPriority(priorityData);

      res.status(201).json({ data: createPriorityData, message: 'priority created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePriority = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const priorityData = req.body;
      const priorityId = Number(req.params.id);
      const updatePriorityData: PriorityEntity = await this.priorityService.updatePriority(priorityId, priorityData);

      res.status(200).json({ data: updatePriorityData, message: 'priority data updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePriority = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const priorityId = Number(req.params.id);
      const deletePriorityData: PriorityEntity = await this.priorityService.deletePriority(priorityId);

      res.status(200).json({ data: deletePriorityData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PriorityController;
