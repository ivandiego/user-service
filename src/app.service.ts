import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Retorna todos os usuários cadastrados no sistema.
   * @returns Lista de usuários.
   */
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}

