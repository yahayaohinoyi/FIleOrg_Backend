import { UserEntity } from './users.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PriorityEntity } from './priorities.entity';
import { ReminderEntity } from './reminders.entity';
// import { User } from '@interfaces/users.interface';

@Entity()
export class FolderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.folders)
  @JoinColumn()
  createdBy: UserEntity;

  @Column()
  @IsNotEmpty()
  folderScore: Number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  folderId: String;

  @OneToOne(() => ReminderEntity, reminder => reminder.folder)
  @JoinColumn()
  reminder: ReminderEntity;

  @OneToOne(() => PriorityEntity, priority => priority.folder)
  @JoinColumn()
  priority: PriorityEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
