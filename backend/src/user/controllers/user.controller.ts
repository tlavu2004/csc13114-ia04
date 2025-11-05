import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterDto } from '../dto/register.dto';
import { mapUserToDto } from '../mappers/user-response.mapper';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    const foundUser = await this.userService.findByEmail(user.email);
    if (!foundUser) {
      throw new Error('User not found');
    }
    return mapUserToDto(foundUser);
  }
}
