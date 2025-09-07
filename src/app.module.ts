import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { ToursModule } from './tours/tours.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '5434'), 10),
        username: config.get<string>('DB_USER', 'admin'),
        password: config.get<string>('DB_PASSWORD', 'admin123'),
        database: config.get<string>('DB_NAME', 'authdb'),
        entities: [User, Role],
        synchronize: true, // ⚠️ Solo en desarrollo
      }),
    }),
    AuthModule,
    ToursModule
  ],
})
export class AppModule {}
