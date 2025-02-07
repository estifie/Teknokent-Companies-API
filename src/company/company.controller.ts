import { Controller, Get, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { CompaniesFetchException } from '../common/exceptions/company.exceptions';
import { Response } from '../common/interfaces';
import { CompanyService } from './company.service';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/')
  async getCompanies(@Query('cityId') cityId: number, @Query('providerId') providerId: number): Promise<Response> {
    try {
      const companies = await this.companyService.getCompanies(cityId, providerId);

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
        case CompaniesFetchException:
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
