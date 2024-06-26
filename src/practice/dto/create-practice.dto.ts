import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePracticeDto {
  @IsString()
  @IsNotEmpty()
  duracionDelProcedimiento: string;
  @IsString()
  complicaciones?: string;
  @IsString()
  @IsNotEmpty()
  resultadoFinal: string;
  @IsString()
  @IsOptional()
  notasMedico?: string;

  fecha: Date;
}
