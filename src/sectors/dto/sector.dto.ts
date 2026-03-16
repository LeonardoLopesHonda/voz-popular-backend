import { IsString } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  name: string;
}

export class UpdateSectorDto {
  @IsString()
  name: string;
}
