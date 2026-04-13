import { Expose } from 'class-transformer';

export class VehicleDto {
  @Expose()
  id: number;

  @Expose()
  make: string;

  @Expose()
  year: number;

  @Expose()
  color: string;

  @Expose()
  price: number;

  @Expose()
  isAvailable?: boolean;
}
