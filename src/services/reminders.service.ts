import { ReminderEntity } from '@/entity/reminders.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { getRepository } from 'typeorm';
class ReminderService {
  public reminders = ReminderEntity;

  public async findReminders(): Promise<ReminderEntity[]> {
    const reminderRepository = getRepository(this.reminders);
    const reminders: ReminderEntity[] = await reminderRepository.find();
    return reminders;
  }

  public async findReminderById(reminderId: number): Promise<ReminderEntity> {
    if (isEmpty(reminderId)) throw new HttpException(400, "reminder doesn't exist");

    const reminderRepository = getRepository(this.reminders);
    const findReminder: ReminderEntity = await reminderRepository.findOne({ where: { id: reminderId } });
    if (!findReminder) throw new HttpException(409, 'Cannot find reminder');

    return findReminder;
  }

  public async createReminder(reminderData: any): Promise<ReminderEntity> {
    if (isEmpty(reminderData)) throw new HttpException(400, "You're not userData");

    const reminderRepository = getRepository(this.reminders);
    const findReminder: ReminderEntity = await reminderRepository.findOne({ where: { id: reminderData.id } });
    if (findReminder) throw new HttpException(409, `reminder ${reminderData.name} already exists`);

    const reminder = new ReminderEntity();
    reminder.title = reminderData.title;
    reminder.description = reminderData.description;
    reminder.reminderDate = reminderData.reminderDate;

    const createReminderData: ReminderEntity = await reminderRepository.save(reminder);

    return createReminderData;
  }

  public async updateReminder(reminderId: number, reminderData: any): Promise<ReminderEntity> {
    if (isEmpty(reminderData)) throw new HttpException(400, 'No data found');

    const reminderRepository = getRepository(this.reminders);
    const findReminder: ReminderEntity = await reminderRepository.findOne({ where: { id: reminderId } });
    if (!findReminder) throw new HttpException(409, 'Cannot find reminder');

    await reminderRepository.update(reminderId, { ...reminderData });

    const updateReminder: ReminderEntity = await reminderRepository.findOne({ where: { id: reminderId } });
    return updateReminder;
  }

  public async deleteReminder(reminderId: number): Promise<ReminderEntity> {
    if (isEmpty(reminderId)) throw new HttpException(400, 'reminder ID required');

    const reminderRepository = getRepository(this.reminders);
    const findReminder: ReminderEntity = await reminderRepository.findOne({ where: { id: reminderId } });
    if (!findReminder) throw new HttpException(409, 'Cannot find reminder');

    await reminderRepository.delete({ id: reminderId });
    return findReminder;
  }
}

export default ReminderService;
