import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly model: Model<RefreshToken>,
  ) { }

  async create(userId: string, token: string, expiresAt: Date) {
    return this.model.create({ userId, token, expiresAt });
  }

  async findByToken(token: string) {
    return this.model.findOne({ token, revoked: false });
  }

  async revoke(token: string) {
    return this.model.updateOne({ token }, { $set: { revoked: true } });
  }

  async revokeAll(userId: string) {
    return this.model.updateMany({ userId }, { $set: { revoked: true } });
  }

  async rotate(userId: string, oldToken: string, newToken: string, expiresAt: Date) {
    await this.model.updateOne({ userId, token: oldToken }, { $set: { revoked: true } });
    return this.create(userId, newToken, expiresAt);
  }
}
