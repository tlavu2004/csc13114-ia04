import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterDto } from '../dto/register.dto';
import { mapUserToDto } from '../mappers/user-response.mapper';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.userService.createUser(dto.email, dto.password);

    return {
      message: 'User registered successfully',
      user: mapUserToDto(user),
    };
  }
}
