import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { Tour } from './entities/tour.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour]),
    AuthModule, // ✅ necesario para que PoliciesGuard encuentre AbilityFactory
  ],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
