import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private jwtService: JwtService
  ) {}

async register(dto: RegisterDto) {
  const user = new User();
  user.nombre = dto.nombre;
  user.email = dto.email;
  await user.setPassword(dto.password);

  const role = await this.roleRepo.findOne({ where: { name: 'editor' } });
  if (!role) {
    throw new Error('Rol "editor" no encontrado. Debes crear el rol primero.');
  }

  user.roles = [role];

  return this.userRepo.save(user);
}



  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ 
      where: { email: dto.email },
      relations: ['roles']
    });

    if (!user || !(await user.validatePassword(dto.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, roles: user.roles.map(r => r.name) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
