import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
// import { Sale } from '../sales/sale.entity';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // 🔥 Agora usa UUID para consistência
  @ApiProperty({ example: 1, description: 'ID único do usuário' })
  id: number;

  @Column()
  @ApiProperty({ example: 'john_doe', description: 'Nome de usuário' })
  username: string;

  @Column()
  @ApiProperty({ example: 'password123', description: 'Senha do usuário' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @ApiProperty({ example: 'user', enum: Role, description: 'Papel do usuário (admin ou user)' })
  role: Role;

//   @OneToMany(() => Sale, (sale) => sale.user)
//   sales: Sale[];  // <--- Adicione esta linha para a relação com vendas

}
