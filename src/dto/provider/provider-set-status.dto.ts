import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ProviderSetStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;
}
