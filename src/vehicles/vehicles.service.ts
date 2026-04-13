import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicles.entity';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(Vehicle) private repo: Repository<Vehicle>) {}

  create(vehicleDto: CreateVehicleDto) {
    const vehicle = this.repo.create(vehicleDto);
    return this.repo.save(vehicle);
  }

  async showAll(query: PaginateQuery) {
    const data = await paginate(query, this.repo, {
      // Only given column will be sorted

      sortableColumns: ['year', 'make', 'price'],
      // Only given column will be search
      searchableColumns: ['make', 'color'],
      select: ['id', 'make', 'year', 'color', 'isAvailable', 'price'],

      //   nullSort: 'last',
      //   defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        price: true,
        age: true,
      },
    });
    console.log(data);
    return data;
  }
}
