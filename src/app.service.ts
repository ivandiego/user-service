import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @MessagePattern('get_all_users')
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @MessagePattern('create_user')
  async createUser(data: { username: string; password: string }): Promise<User> {
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }
}
