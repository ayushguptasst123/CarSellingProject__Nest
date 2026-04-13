import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  make: string;

  @IsNumber()
  year: number;

  @IsString()
  color: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  isSold?: boolean;
}
