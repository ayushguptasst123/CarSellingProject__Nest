import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicles.entity';

@Module({
  providers: [VehiclesService],
  controllers: [VehiclesController],
  imports: [TypeOrmModule.forFeature([Vehicle])],
})
export class VehiclesModule {}
