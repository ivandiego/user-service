import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './user.entity';
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

  async createUser(data: { username: string; password: string, role: Role}): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = this.userRepository.create({ username: data.username, password: hashedPassword, role: data.role });
    const savedUser = await this.userRepository.save(newUser);

    // 🔥 Remover a senha do retorno para segurança
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword as User;
    }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }

    return user;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    console.log("validateUser - Found user:", JSON.stringify(user, null, 2)); // ✅ Log formatado

    if (!user) {
      return null;
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }
  
    return { id: user.id, username: user.username, role: user.role } as User;
  }
  
}
