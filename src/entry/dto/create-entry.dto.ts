import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEntryDto {
  @IsNumber()
  @IsNotEmpty()
  historyClinicId: number;

  @IsNumber()
  @IsNotEmpty()
  doctorId: number;
}
