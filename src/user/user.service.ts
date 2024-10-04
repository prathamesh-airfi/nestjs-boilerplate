import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  fetchAll(): Promise<User[]> {
    return this.userModel.find();
  }

  fetchById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
}
