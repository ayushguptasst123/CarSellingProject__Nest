import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicles.entity';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(Vehicle) private repo: Repository<Vehicle>) {}

  create(vehicleDto: CreateVehicleDto) {
    const vehicle = this.repo.create(vehicleDto);
    return this.repo.save(vehicle);
  }
}
