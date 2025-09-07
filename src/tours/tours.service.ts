import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  create(createTourDto: CreateTourDto) {
    const tour = this.tourRepository.create(createTourDto);
    return this.tourRepository.save(tour);
  }

  findAll() {
    return this.tourRepository.find();
  }

  findOne(id: number) {
    return this.tourRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    await this.tourRepository.update(id, updateTourDto);
    return this.tourRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.tourRepository.delete(id);
  }
}
