import { Body, Controller, Get, Post } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { VehicleDto } from './dtos/vehicle.dto';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';

@Controller('vehicles')
@Serialize(VehicleDto)
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Post()
  createVehicle(@Body() body: CreateVehicleDto) {
    return this.vehiclesService.create(body);
  }

  @Get()
  showAllVehicles(@Paginate() query: PaginateQuery) {
    return this.vehiclesService.showAll(query);
  }
}
