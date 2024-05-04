import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Provider } from '@prisma/client';

import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from '../auth/guards/role.guard';
import { Response } from '../common/interfaces';
import { ProviderCreateDto, ProviderSetStatusDto, ProviderUpdateDto } from '../dto';
import { ProviderCreationException, ProviderDeletionException, ProviderNotFoundException, ProviderUpdateException } from '../exceptions';
import { AdminService } from './admin.service';

@Controller('admin')
/**
 * Controller responsible for handling admin-related requests.
 *
 * @remarks
 * This controller provides endpoints for provider creation, deletion, retrieval, and update.
 */
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Handles the provider creation request.
   *
   * @param providerCreateDto - The provider creation data.
   * @returns A promise that resolves to the created provider data.
   * @throws `InternalServerErrorException` for any internal server errors.
   * @throws `ProviderCreationException` if there is an error during provider creation.
   * @remarks
   * This endpoint is guarded by the `RoleGuard`.
   * Only users with the `admin` role can access this endpoint.
   */
  @Post('/providers')
  @UseGuards(RoleGuard)
  @ApiBearerAuth('JWT-auth')
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

  /**
   * Handles the provider deletion request.
   *
   * @param providerCode - The provider code.
   * @returns A promise that resolves to the deleted provider data.
   * @throws `InternalServerErrorException` for any internal server errors.
   * @throws `ProviderDeletionException` if there is an error during provider deletion.
   * @throws `ProviderNotFoundException` if the provider is not found.
   * @remarks
   * This endpoint is guarded by the `RoleGuard`.
   * Only users with the `admin` role can access this endpoint.
   */
  @Delete('/providers/:providerCode')
  @UseGuards(RoleGuard)
  @ApiBearerAuth('JWT-auth')
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

  /**
   * Handles the provider retrieval request.
   *
   * @returns A promise that resolves to an array of provider data.
   * @throws `InternalServerErrorException` for any internal server errors.
   * @remarks
   * This endpoint is guarded by the `RoleGuard`.
   * Only users with the `admin` role can access this endpoint.
   */
  @Get('/providers')
  @UseGuards(RoleGuard)
  @ApiBearerAuth('JWT-auth')
  async getProviders(): Promise<Provider[]> {
    try {
      return await this.adminService.getProviders();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Handles the provider retrieval request.
   *
   * @param providerCode - The provider code.
   * @returns A promise that resolves to the provider data.
   * @throws `InternalServerErrorException` for any internal server errors.
   * @throws `ProviderNotFoundException` if the provider is not found.
   * @remarks
   * This endpoint is guarded by the `RoleGuard`.
   * Only users with the `admin` role can access this endpoint.
   */
  @Get('/providers/:providerCode')
  @UseGuards(RoleGuard)
  @ApiBearerAuth('JWT-auth')
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

  /**
   * Handles the provider update request.
   *
   * @param providerCode - The provider code.
   * @param providerUpdateDto - The provider update data.
   * @returns A promise that resolves to the updated provider data.
   * @throws `InternalServerErrorException` for any internal server errors.
   * @throws `ProviderUpdateException` if there is an error during provider update.
   * @throws `ProviderNotFoundException` if the provider is not found.
   * @remarks
   * This endpoint is guarded by the `RoleGuard`.
   * Only users with the `admin` role can access this endpoint.
   */
  @Patch('/providers/:providerCode')
  @UseGuards(RoleGuard)
  @ApiBearerAuth('JWT-auth')
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

  /**
   * Handles the provider status update request.
   *
   * @param providerCode - The provider code.
   * @param providerSetStatusDto - The provider status update data.
   * @returns A promise that resolves to the updated provider data.
   * @throws `InternalServerErrorException` for any internal server errors.
   * @throws `ProviderUpdateException` if there is an error during provider status update.
   * @throws `ProviderNotFoundException` if the provider is not found.
   * @remarks
   * This endpoint is guarded by the `RoleGuard`.
   * Only users with the `admin` role can access this endpoint.
   */
  @Post('/providers/:providerCode/status')
  @UseGuards(RoleGuard)
  @ApiBearerAuth('JWT-auth')
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
