import { PartialType } from '@nestjs/mapped-types';
import { CreateTourDto } from './create-tour.dto';
import { IsOptional, IsString, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class UpdateTourDto extends PartialType(CreateTourDto) {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  destino?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio?: number;

  @IsOptional()
  @IsDateString()
  fecha_inicio?: string;
}
