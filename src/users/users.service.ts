import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

type Bcrypt = {
  compare: (s: string, hash: string) => Promise<boolean>;
  hash: (s: string, rounds: number) => Promise<string>;
};

const bcryptTyped = bcrypt as Bcrypt;

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  validatePassword(plain: string, hashed: string): Promise<boolean> {
    return bcryptTyped.compare(plain, hashed);
  }

  hashPassword(password: string): Promise<string> {
    return bcryptTyped.hash(password, this.saltRounds);
  }
}
