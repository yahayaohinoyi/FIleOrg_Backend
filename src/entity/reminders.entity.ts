import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FileEntity } from './files.entity';
import { FolderEntity } from './folders.entity';
import { PriorityEntity } from './priorities.entity';

@Entity()
export class ReminderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => FileEntity, file => file.reminder)
  file: FileEntity;

  @OneToOne(() => PriorityEntity, priority => priority.reminder)
  @JoinColumn()
  priority: PriorityEntity;

  @OneToOne(() => FolderEntity, folder => folder.reminder)
  @JoinColumn()
  folder: FolderEntity;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  reminderDate: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
