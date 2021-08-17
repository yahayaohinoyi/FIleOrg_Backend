import { IsString, IsOptional } from 'class-validator';

export class CreatePriorityDto {
  @IsOptional()
  public id: string;

  @IsString()
  @IsOptional()
  public name: string;
}
