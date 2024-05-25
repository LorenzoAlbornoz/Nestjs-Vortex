import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateConsultationDto {
  @IsString()
  @IsNotEmpty()
  motivoDeConsulta: string;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @IsNotEmpty()
  confirmacionDeDiagnostico: string; 

  @IsString()
  @IsOptional()
  notasMedico?: string;

  fecha: Date;
}