import { IsDate, IsUUID, MinDate } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateAccessTokenDto {
  user: User;

  @IsUUID()
  tokenId: string;

  @IsDate()
  @MinDate(new Date())
  expiresAt: Date;
}
