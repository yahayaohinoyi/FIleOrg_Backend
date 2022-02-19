import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FileEntity } from './files.entity';
import { FolderEntity } from './folders.entity';
// import { User } from '@interfaces/users.interface';

@Entity()
export class FileFolderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FileEntity, file => file.folders, { cascade: true })
  @JoinColumn()
  file: FileEntity;

  @ManyToOne(() => FolderEntity, folder => folder.files, { cascade: true })
  @JoinColumn()
  folder: FolderEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
