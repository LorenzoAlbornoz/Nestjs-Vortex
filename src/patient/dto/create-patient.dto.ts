// create-patient.dto.ts
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntryDto } from '../../entry/dto/create-entry.dto';

export class CreatePatientDto {
  @IsNumber()
  @IsNotEmpty()
  dni: number;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  fechaDeNacimiento: Date;

  @IsString()
  @IsNotEmpty()
  obraSocial: string;

  @IsNumber()
  @IsNotEmpty()
  historyClinicId: number; // Agrega esta propiedad para asociar la historia clínica con el paciente

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEntryDto)
  entries?: CreateEntryDto[];
}