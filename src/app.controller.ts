import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from './user.entity';
import { Role } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: AppService) {}

  @MessagePattern('get_all_users')
  async handleGetAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @MessagePattern('create_user')
  async handleCreateUser(data: { username: string; password: string; role: Role }): Promise<User> {
    return this.userService.createUser(data);
  }

  @MessagePattern('validate_user')
  async handleValidateUser(data: { username: string; password: string }): Promise<User | null> {
    const user = await this.userService.validateUser(data.username, data.password);

    return user;
  }
  @MessagePattern('get_user_by_username')
  async getUserByUsername(data: { username: string }): Promise<User | null> {
    const { username } = data;

    console.log(username + ' get_user_by_username ');
    return this.userService.getUserByUsername(username);  
  }
}   

