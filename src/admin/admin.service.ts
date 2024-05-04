import { Injectable } from '@nestjs/common';
import { Provider } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ProviderCreateDto, ProviderSetStatusDto, ProviderUpdateDto } from '../dto';
import { ProviderCreationException, ProviderDeletionException, ProviderNotFoundException, ProviderUpdateException } from '../exceptions';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   *  Creates a new provider.
   */
  async createProvider(providerCreateDto: ProviderCreateDto): Promise<Provider> {
    const provider = this.prismaService.provider.create({
      data: {
        code: providerCreateDto.code,
        website: providerCreateDto.website,
        shortTitle: providerCreateDto.title.short,
        fullTitle: providerCreateDto.title.full,
        cityId: providerCreateDto.cityId,
        email: providerCreateDto.contact.email,
        phone: providerCreateDto.contact.phone,
        address: providerCreateDto.contact.address,
      },
    });

    if (!provider) {
      throw new ProviderCreationException();
    }

    return provider;
  }

  /**
   * Sets the status of a provider.
   */
  async setProviderStatus(providerCode: string, providerSetStatusDto: ProviderSetStatusDto): Promise<Provider> {
    if (!providerCode) {
      throw new ProviderNotFoundException();
    }

    const provider = this.prismaService.provider.update({
      where: {
        code: providerCode,
      },
      data: {
        active: providerSetStatusDto.status,
      },
    });

    if (!provider) {
      throw new ProviderUpdateException();
    }

    return provider;
  }

  /**
   * Updates a provider.
   */
  async updateProvider(providerCode: string, providerUpdateDto: ProviderUpdateDto) {
    if (!providerCode) {
      throw new ProviderNotFoundException();
    }

    const { updateFields } = providerUpdateDto;

    const provider = await this.prismaService.provider.update({
      where: {
        code: providerCode,
      },
      data: {
        ...updateFields,
      },
    });

    if (!provider) {
      throw new ProviderUpdateException();
    }

    return provider;
  }

  /**
   * Removes a provider.
   */
  async removeProvider(providerCode: string): Promise<any> {
    if (!providerCode) {
      throw new ProviderNotFoundException();
    }

    const provider = await this.prismaService.provider.delete({
      where: {
        code: providerCode,
      },
    });

    if (!provider) {
      throw new ProviderDeletionException();
    }

    return {
      message: 'Provider removed',
    };
  }

  /**
   * Retrieves all providers.
   */
  async getProviders(): Promise<Provider[]> {
    return await this.prismaService.provider.findMany();
  }

  /**
   * Retrieves a provider.
   */
  async getProvider(providerCode: string): Promise<Provider> {
    if (!providerCode) {
      throw new ProviderNotFoundException();
    }

    return await this.prismaService.provider.findUnique({
      where: {
        code: providerCode,
      },
    });
  }
}
