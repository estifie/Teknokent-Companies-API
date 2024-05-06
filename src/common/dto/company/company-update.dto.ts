import { IsNotEmpty } from 'class-validator';

type CompanyUpdateInput = {
  name?: string;
  sector?: number;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
};

export class CompanyUpdateDto {
  @IsNotEmpty()
  readonly updateFields: Partial<CompanyUpdateInput>;
}
