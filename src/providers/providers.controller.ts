import { Controller, Get, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Response } from '../common/interfaces';
import { ProviderNotFoundException } from '../exceptions';
import { AnkaraUniversityService, AsoTeknoparkService, HacettepeService, OdtuService, TeknoparkAnkaraService } from './ankara.service';

@Controller('providers')
export class ProvidersController {
  constructor(
    private readonly odtuService: OdtuService,
    private readonly hacettepeService: HacettepeService,
    private readonly ankaraUniversityService: AnkaraUniversityService,
    private readonly teknoparkAnkaraService: TeknoparkAnkaraService,
    private readonly asoTeknoparkService: AsoTeknoparkService,
  ) {}

  @Get('odtu')
  async scrapeOdtuCompanies() {
    try {
      const [createdCompanies, updatedCompanies] = await this.odtuService.scrapeCompanies();

      const response: Response = {
        status: 'success',
        data: {
          createdCompanies,
          updatedCompanies,
        },
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

  @Get('hacettepe')
  async scrapeHacettepeCompanies() {
    try {
      const [createdCompanies, updatedCompanies] = await this.hacettepeService.scrapeCompanies();

      const response: Response = {
        status: 'success',
        data: {
          createdCompanies,
          updatedCompanies,
        },
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

  @Get('ankarauniversity')
  async scrapeAnkaraUniversityCompanies() {
    try {
      const [createdCompanies, updatedCompanies] = await this.ankaraUniversityService.scrapeCompanies();

      const response: Response = {
        status: 'success',
        data: {
          createdCompanies,
          updatedCompanies,
        },
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

  @Get('teknoparkankara')
  async scrapeTeknoparkAnkaraCompanies() {
    try {
      const [createdCompanies, updatedCompanies] = await this.teknoparkAnkaraService.scrapeCompanies();

      const response: Response = {
        status: 'success',
        data: {
          createdCompanies,
          updatedCompanies,
        },
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

  @Get('asoteknopark')
  async scrapeAsoTeknoparkCompanies() {
    try {
      const [createdCompanies, updatedCompanies] = await this.asoTeknoparkService.scrapeCompanies();

      const response: Response = {
        status: 'success',
        data: {
          createdCompanies,
          updatedCompanies,
        },
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
