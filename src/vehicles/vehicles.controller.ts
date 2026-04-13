import { Body, Controller, Post } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Post()
  createVehicle(@Body() body: CreateVehicleDto) {
    return this.vehiclesService.create(body);
  }
}
