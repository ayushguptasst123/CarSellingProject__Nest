import { Expose } from 'class-transformer';

export class UserDto {
  constructor() {
    console.log("I'm running here ---------------------");
  }
  @Expose()
  id: number;

  @Expose()
  email: string;
}
