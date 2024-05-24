import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/common/enums/rol.enum';
// import { Auth } from 'src/common/decorators/auth.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from './guards/access-token.guard';
import { RolesGuard } from './guards/roles.guard';
interface RequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }

  // @Get('profile')
  // @Auth(Role.ADMIN)
  // profile(@Req() req: RequestWithUser) {
  //   return this.authService.profile(req.user);
  // }
}
