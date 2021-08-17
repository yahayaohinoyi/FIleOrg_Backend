import ReminderService from '@/services/reminders.service';
import { NextFunction, Request, Response } from 'express';
import { ReminderEntity } from './../entity/reminders.entity';

class ReminderController {
  public reminderService = new ReminderService();

  public getReminders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllReminderData: ReminderEntity[] = await this.reminderService.findReminders();

      res.status(200).json({ data: findAllReminderData, message: 'all Priorities' });
    } catch (error) {
      next(error);
    }
  };

  public getReminderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reminderId = Number(req.params.id);
      const findReminder: ReminderEntity = await this.reminderService.findReminderById(reminderId);

      res.status(200).json({ data: findReminder, message: 'reminder found' });
    } catch (error) {
      next(error);
    }
  };

  public createReminder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reminderData = req.body;
      const createReminderData: ReminderEntity = await this.reminderService.createReminder(reminderData);

      res.status(201).json({ data: createReminderData, message: 'reminder created' });
    } catch (error) {
      next(error);
    }
  };

  public updateReminder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reminderData = req.body;
      const reminderId = Number(req.params.id);
      const updateReminderData: ReminderEntity = await this.reminderService.updateReminder(reminderId, reminderData);

      res.status(200).json({ data: updateReminderData, message: 'reminder data updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteReminder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reminderId = Number(req.params.id);
      const deleteReminderData: ReminderEntity = await this.reminderService.deleteReminder(reminderId);

      res.status(200).json({ data: deleteReminderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ReminderController;
