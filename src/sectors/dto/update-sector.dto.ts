import { IsString } from 'class-validator';

export class UpdateSectorDto {
  @IsString()
  name: string;
}
