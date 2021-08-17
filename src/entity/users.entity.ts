import { FolderEntity } from './folders.entity';
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { FileEntity } from './files.entity';

@Entity()
@Unique(['email'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => FileEntity, files => files.createdBy)
  files: FileEntity[];

  @OneToMany(() => FolderEntity, folders => folders.createdBy)
  folders: FolderEntity[];

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  // @IsNotEmpty()
  password: string;

  @Column({ default: false })
  @IsNotEmpty()
  isConnected: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
