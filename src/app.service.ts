import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MessagePattern } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: { username: string; password: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = this.userRepository.create({ username: data.username, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user ?? undefined;  
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (!user) {
      return null;
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }
  
    return user;
  }
  
}
