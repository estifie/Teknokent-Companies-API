import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateResponseDto {
  @IsNotEmpty()
  @IsString()
  readonly apiKey: string;

  @IsNotEmpty()
  @IsString()
  readonly apiKeySecret: string;
}
