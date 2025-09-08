import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../auth/policies.guard';
import { CheckPolicies } from '../auth/check-ability.decorator';
import { AbilityFactory } from '../auth/ability.factory';
import { Action } from '../auth/action.enum';
import { Tour } from './entities/tour.entity';

@Controller('tours')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class ToursController {
  constructor(
    private readonly toursService: ToursService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Post()
  @CheckPolicies((ability) => ability.can(Action.Create, 'Tour'))
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }5

  @Get()
  @CheckPolicies((ability) => ability.can(Action.Read, 'Tour'))
  findAll() {
    return this.toursService.findAll();
  }

  @Patch(':id')
  @CheckPolicies((ability) => ability.can(Action.Update, 'Tour'))
  update(@Param('id') id: number, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(id, updateTourDto);
  }

  @Delete(':id')
  @CheckPolicies((ability) => ability.can(Action.Delete, 'Tour'))
  remove(@Param('id') id: number) {
    return this.toursService.remove(id);
  }
}
