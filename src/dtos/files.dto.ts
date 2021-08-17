import { IsString, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsOptional()
  public id: string;

  @IsOptional()
  public reminder: string;

  @IsOptional()
  public priority: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsOptional()
  public document_id: string;
}
