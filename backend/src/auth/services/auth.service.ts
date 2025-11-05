import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { mapUserToTokenPayload } from '../mapper/token.mapper';
import { RefreshTokenService } from './refresh-token.service';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class AuthService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET')!;
    this.refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET')!;
    this.accessExpiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m';
    this.refreshExpiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d';
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = mapUserToTokenPayload(user);

    const accessToken = this.jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn as any,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn as any,
    });

    const expiresAt = new Date(Date.now() + ms(this.refreshExpiresIn as any));

    await this.refreshTokenService.create(user.id, refreshToken, expiresAt);

    return {
      message: 'Login successful',
      user: payload,
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: this.accessExpiresIn,
    };
  }

  async refreshToken(payload: TokenPayload, oldRefreshToken: string) {
    if (!oldRefreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    const user = await this.userService.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException('Invalid token');

    const newPayload = mapUserToTokenPayload(user);

    const newAccessToken = this.jwtService.sign(newPayload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn as any,
    });

    const newRefreshToken = this.jwtService.sign(newPayload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn as any,
    });

    const expiresAt = new Date(Date.now() + ms(this.refreshExpiresIn as any));

    await this.refreshTokenService.rotate(user.id, oldRefreshToken, newRefreshToken, expiresAt);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string) {
    await this.refreshTokenService.revoke(refreshToken);
    return { message: 'Logged out successfully' };
  }

  async logoutAll(userId: string) {
    await this.refreshTokenService.revokeAll(userId);
  }

}
