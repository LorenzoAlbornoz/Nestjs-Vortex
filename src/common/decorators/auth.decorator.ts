import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../enums/rol.enum';
import { AuthGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
