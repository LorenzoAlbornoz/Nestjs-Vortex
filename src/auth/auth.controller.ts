import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from './interfaces/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    console.log('algo', registerDto)
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    console.log('algo', loginDto)
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  @Auth(Role.SECRETARY)
  // creamos nuestro decoradors
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}
