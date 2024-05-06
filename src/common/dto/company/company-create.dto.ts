import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CompanyCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly website: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly providerCode: string;

  @IsNotEmpty()
  @IsNumber()
  readonly sector: number;
}
