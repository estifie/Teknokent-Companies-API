import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CompanyCreateDto } from '../common/dto';
import { CompanyUpdateDto } from '../common/dto/company/company-update.dto';
import { ProviderNotFoundException } from '../common/exceptions';
import { CompaniesFetchException, CompanyNotFoundException, CompanyUpdateException } from '../common/exceptions/company.exceptions';

/**
 * Common functions and utilities that can be used across the application.
 */
@Injectable()
export class CompanyService {
  constructor(
    private httpService: HttpService,
    private prismaService: PrismaService,
  ) {}

  /**
   * Retrieve all companies
   * @returns A promise that resolves to an array of companies
   */
  async getCompanies(cityId?: number, providerId?: number): Promise<Company[]> {
    try {
      // cityId is in providerId's params

      const companies = await this.prismaService.company.findMany({
        where: {
          provider: {
            cityId: cityId || undefined,
            id: providerId || undefined,
          },
        },
      });

      return companies;
    } catch (error) {
      throw new CompaniesFetchException();
    }
  }

  /**
   * Retrieve companies by code
   * @param code - The provider code
   * @returns A promise that resolves to an array of companies
   */
  async getCompaniesByCode(code: string): Promise<Company[]> {
    try {
      // First get the provider by code
      const provider = await this.prismaService.provider.findUnique({
        where: {
          code,
        },
      });

      // If the provider is not found, throw an exception
      if (!provider) throw new ProviderNotFoundException();

      // Then get the company by provider id
      const companies = await this.prismaService.company.findMany({
        where: {
          providerId: provider.id,
        },
      });

      return companies;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Retrieve companies by sector
   * @param sector - The sector
   * @returns A promise that resolves to an array of companies
   */
  async getCompaniesBySector(sector: number): Promise<Company[]> {
    try {
      const companies = await this.prismaService.company.findMany({
        where: {
          sector,
        },
      });

      return companies;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Create a new company
   */
  async createCompany(companyCreateDto: CompanyCreateDto): Promise<Company> {
    try {
      const provider = await this.prismaService.provider.findUnique({
        where: {
          code: companyCreateDto.providerCode,
        },
      });

      if (!provider) throw new ProviderNotFoundException();

      const company = await this.prismaService.company.create({
        data: {
          name: companyCreateDto.name,
          website: companyCreateDto.website,
          email: companyCreateDto.email,
          phone: companyCreateDto.phone,
          address: companyCreateDto.address,
          sector: companyCreateDto.sector,
          provider: {
            connect: {
              id: provider.id,
            },
          },
        },
      });

      return company;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update a company
   */
  async updateCompany(companyId: number, companyUpdateDto: CompanyUpdateDto): Promise<Company> {
    if (!companyId) {
      throw new CompanyNotFoundException();
    }

    // CompanyUpdateDto contains fields and values to update
    const { updateFields } = companyUpdateDto;

    // Update given fields
    const updatedCompany = await this.prismaService.company.update({
      where: {
        id: companyId,
      },
      data: {
        ...updateFields,
      },
    });

    if (!updatedCompany) {
      throw new CompanyUpdateException();
    }

    return updatedCompany;
  }
}
