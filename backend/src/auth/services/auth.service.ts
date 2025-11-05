import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { mapUserToTokenPayload } from '../mapper/token.mapper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = mapUserToTokenPayload(user);
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      message: 'Login successful',
      user: mapUserToTokenPayload(user),
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(payload: TokenPayload) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    const newPayload = mapUserToTokenPayload(user);
    return { accessToken: this.jwtService.sign(newPayload, { expiresIn: '15m' }) };
  }

  async logout(refreshToken: string) {
    return;
  }
}
