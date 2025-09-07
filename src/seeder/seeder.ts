import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class Seeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  async onApplicationBootstrap() {
    let adminRole = await this.roleRepo.findOne({ where: { name: 'admin' } });
    if (!adminRole) {
      adminRole = await this.roleRepo.save({ name: 'admin' });
    }

    let editorRole = await this.roleRepo.findOne({ where: { name: 'editor' } });
    if (!editorRole) {
      editorRole = await this.roleRepo.save({ name: 'editor' });
    }

    const adminUser = await this.userRepo.findOne({ where: { email: 'admin@admin.com' } });
    if (!adminUser) {
      const user = new User();
      user.nombre = 'Admin';
      user.email = 'admin@admin.com';
      await user.setPassword('admin123');
      user.roles = [adminRole];
      await this.userRepo.save(user);
      console.log('Admin creado con email: admin@admin.com y password: admin123');
    }
  }
}
