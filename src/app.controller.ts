import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './user.entity';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Users')
@Controller()export class AppController {
  constructor(private readonly appService: AppService) {}
  
  // @Get()
  // @ApiOperation({ summary: 'Lista todos os usuários' })
  // @ApiResponse({ status: 200, description: 'Lista de usuários', type: [User] })
  // async getAllUsers(): Promise<User[]> {
  //   return this.appService.getAllUsers();
  // }

  @MessagePattern('get_all_users')
  async handleGetAllUsers() {
    return this.appService.getAllUsers();
  }

}
