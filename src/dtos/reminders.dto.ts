import { IsString, IsOptional } from 'class-validator';

export class CreateReminderDto {
  @IsOptional()
  public id: string;

  @IsString()
  public reminderDate: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;
}
