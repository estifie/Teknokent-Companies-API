import { IsNotEmpty } from 'class-validator';

type ProviderUpdateInput = {
  code?: string;
  website?: string;
  shortTitle?: string;
  fullTitle?: string;
  cityId?: number;
  email?: string;
  phone?: string;
  address?: string;
  active?: boolean;
};

export class ProviderUpdateDto {
  @IsNotEmpty()
  readonly updateFields: Partial<ProviderUpdateInput>;
}
