import { FileFolderEntity } from './filesfolders.entity';
import { UserEntity } from './users.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PriorityEntity } from './priorities.entity';
import { ReminderEntity } from './reminders.entity';
// import { User } from '@interfaces/users.interface';

@Entity()
export class FolderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.folders, { onDelete: 'CASCADE' })
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

  @OneToMany(() => FileFolderEntity, files => files.folder, { onDelete: 'CASCADE' })
  @JoinColumn()
  files: FileFolderEntity[];

  @OneToOne(() => ReminderEntity, reminder => reminder.folder)
  @JoinColumn()
  reminder: ReminderEntity;

  @ManyToOne(() => PriorityEntity, priority => priority.folders)
  @JoinColumn()
  priority: PriorityEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
