import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    } catch (error) {
      throw new BadRequestException('Error hashing password');
    }
  }

  async createUser(email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = new this.userModel({ email, password: hashedPassword });
    return user.save();
  }
}
