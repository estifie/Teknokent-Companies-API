import { IsNotEmpty, IsString } from 'class-validator';

export class UserResponseDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
