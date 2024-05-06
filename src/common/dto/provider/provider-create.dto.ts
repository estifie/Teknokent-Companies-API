import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProviderCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  readonly website: string;

  @IsNotEmpty()
  readonly title: {
    short: string;
    full: string;
  };

  @IsNotEmpty()
  @IsNumber()
  readonly cityId: number;

  @IsNotEmpty()
  readonly contact: {
    email: string | undefined;
    phone: string | undefined;
    address: string | undefined;
  };
}
