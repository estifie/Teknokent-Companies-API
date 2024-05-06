import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Provider } from '@prisma/client';

import { RoleGuard } from '../auth/guards/role.guard';
import { ProviderCreateDto, ProviderSetStatusDto, ProviderUpdateDto } from '../common/dto';
import { ProviderCreationException, ProviderDeletionException, ProviderNotFoundException, ProviderUpdateException } from '../common/exceptions';
import { Response } from '../common/interfaces';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/providers')
  @UseGuards(RoleGuard)
  async createProvider(@Body() providerCreateDto: ProviderCreateDto): Promise<Provider> {
    try {
      return await this.adminService.createProvider(providerCreateDto);
    } catch (error) {
      const response: Response = {
        status: 'error',
        message: undefined,
      };
      switch (error.constructor) {
        case ProviderCreationException:
          response.message = error.message;
          throw new InternalServerErrorException(response);
        default:
          response.message = error.message;
          throw new InternalServerErrorException(response);
      }
    }
  }

  @Delete('/providers/:providerCode')
  @UseGuards(RoleGuard)
  async removeProvider(@Query('providerCode') providerCode: string): Promise<any> {
    try {
      return await this.adminService.removeProvider(providerCode);
    } catch (error) {
      const response: Response = {
        status: 'error',
        message: undefined,
      };
      switch (error.constructor) {
        case ProviderDeletionException:
          response.message = error.message;
          throw new InternalServerErrorException(response);
        case ProviderNotFoundException:
          response.message = error.message;
          throw new NotFoundException(response);
        default:
          response.message = error.message;
          throw new InternalServerErrorException(response);
      }
    }
  }

  @Get('/providers')
  @UseGuards(RoleGuard)
  async getProviders(): Promise<Provider[]> {
    try {
      return await this.adminService.getProviders();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/providers/:providerCode')
  @UseGuards(RoleGuard)
  async getProvider(@Param('providerCode') providerCode: string): Promise<Provider> {
    try {
      return await this.adminService.getProvider(providerCode);
    } catch (error) {
      const response: Response = {
        status: 'error',
        message: undefined,
      };
      switch (error.constructor) {
        case ProviderNotFoundException:
          response.message = error.message;
          throw new NotFoundException(response);
        default:
          response.message = error.message;
          throw new InternalServerErrorException(response);
      }
    }
  }

  @Patch('/providers/:providerCode')
  @UseGuards(RoleGuard)
  async updateProvider(@Param('providerCode') providerCode: string, @Body() providerUpdateDto: ProviderUpdateDto): Promise<Provider> {
    try {
      return await this.adminService.updateProvider(providerCode, providerUpdateDto);
    } catch (error) {
      const response: Response = {
        status: 'error',
        message: undefined,
      };
      switch (error.constructor) {
        case ProviderUpdateException:
          response.message = error.message;
          throw new InternalServerErrorException(response);
        case ProviderNotFoundException:
          response.message = error.message;
          throw new NotFoundException(response);
        default:
          response.message = error.message;
          throw new InternalServerErrorException(response);
      }
    }
  }

  @Post('/providers/:providerCode/status')
  @UseGuards(RoleGuard)
  async setProviderStatus(@Param('providerCode') providerCode: string, @Body() providerSetStatusDto: ProviderSetStatusDto): Promise<Provider> {
    try {
      return await this.adminService.setProviderStatus(providerCode, providerSetStatusDto);
    } catch (error) {
      const response: Response = {
        status: 'error',
        message: undefined,
      };
      switch (error.constructor) {
        case ProviderUpdateException:
          response.message = error.message;
          throw new InternalServerErrorException(response);
        case ProviderNotFoundException:
          response.message = error.message;
          throw new NotFoundException(response);
        default:
          response.message = error.message;
          throw new InternalServerErrorException(response);
      }
    }
  }
}
