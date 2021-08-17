import { CreateReminderDto } from './../dtos/reminders.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import ReminderController from '@/controllers/reminders.controller';

class RemindersRoute implements Routes {
  public path = '/reminders';
  public router = Router();
  public remindersController = new ReminderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.remindersController.getReminders);
    this.router.get(`${this.path}/:id(\\d+)`, this.remindersController.getReminderById);
    this.router.post(`${this.path}`, validationMiddleware(CreateReminderDto, 'body'), this.remindersController.createReminder);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateReminderDto, 'body', true), this.remindersController.updateReminder);
    this.router.delete(`${this.path}/:id(\\d+)`, this.remindersController.deleteReminder);
  }
}

export default RemindersRoute;
