import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  numeroDeMatricula: number;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsDateString()
  fechaDeIngreso: string;
}
