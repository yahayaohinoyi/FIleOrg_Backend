import { UserEntity } from '@entity/users.entity';
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { PriorityEntity } from './priorities.entity';
import { ReminderEntity } from './reminders.entity';
// import { User } from '@interfaces/users.interface';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.files)
  @JoinColumn()
  createdBy: UserEntity;

  @Column()
  @IsNotEmpty()
  downloadCount: Number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  document_id: String;

  @OneToOne(() => ReminderEntity, reminder => reminder.file)
  @JoinColumn()
  reminder: ReminderEntity;

  @OneToOne(() => PriorityEntity, priority => priority.file)
  @JoinColumn()
  priority: PriorityEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
