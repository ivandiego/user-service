import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: AppService) {}

  @MessagePattern('get_all_users')
  async handleGetAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @MessagePattern('create_user')
  async handleCreateUser(data: { username: string; password: string }): Promise<User> {
    return this.userService.createUser(data);
  }
}
