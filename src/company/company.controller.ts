import { Controller, Get, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Response } from '../common/interfaces';
import { ProviderNotFoundException } from '../exceptions';
import { CompanyService } from './company.service';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/')
  async getAllCompanies() {
    try {
      const companies = await this.companyService.getAllCompanies();

      const response: Response = {
        status: 'success',
        data: companies,
      };

      return response;
    } catch (error) {
      const response: Response = {
        status: 'error',
        message: undefined,
      };
      switch (error.constructor) {
        case ProviderNotFoundException:
          response.message = error.message;
          throw new NotFoundException(response);
        case Error:
          response.message = error.message;
          throw new InternalServerErrorException(response);
        default:
          response.message = error.message;
          throw new InternalServerErrorException(response);
      }
    }
  }
}
