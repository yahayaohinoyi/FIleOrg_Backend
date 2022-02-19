import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FileFolderEntity } from './filesfolders.entity';
import { PriorityEntity } from './priorities.entity';
import { ReminderEntity } from './reminders.entity';
import { UserEntity } from './users.entity';
// import { User } from '@interfaces/users.interface';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.files, { onDelete: 'CASCADE' })
  @JoinColumn()
  createdBy: UserEntity;

  @Column()
  @IsNotEmpty()
  downloadCount: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  document_id: String;

  @OneToMany(() => FileFolderEntity, folders => folders.file, { onDelete: 'CASCADE' })
  @JoinColumn()
  folders: FileFolderEntity[];

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
