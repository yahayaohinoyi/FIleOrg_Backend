import { FolderEntity } from './folders.entity';
import { ReminderEntity } from './reminders.entity';
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { FileEntity } from './files.entity';

@Entity()
export class PriorityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToOne(() => FileEntity, file => file.priority)
  file: FileEntity;

  @OneToOne(() => ReminderEntity, reminder => reminder.priority)
  reminder: ReminderEntity;

  @OneToOne(() => FolderEntity, folder => folder.priority)
  folder: FolderEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
