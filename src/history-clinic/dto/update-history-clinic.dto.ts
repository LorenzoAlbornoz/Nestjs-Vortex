import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryClinicDto } from './create-history-clinic.dto';

export class UpdateHistoryClinicDto extends PartialType(CreateHistoryClinicDto) {}
