import { PriorityEntity } from './priorities.entity';
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { FileEntity } from './files.entity';
import { file } from 'googleapis/build/src/apis/file';

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
