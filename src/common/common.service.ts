import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Company as PrismaCompany, Provider } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { PrismaService } from '../../prisma/prisma.service';
import { Company } from '../common/interfaces';
import { CompanyService } from '../company/company.service';
import { CompanyCreateDto } from '../dto';
import { CompanyUpdateDto } from '../dto/company/company-update.dto';
import { ProviderNotFoundException } from '../exceptions';
import { CompanyCreationException } from '../exceptions/company.exceptions';

/**
 * Common functions and utilities that can be used across the application.
 */
@Injectable()
export class CommonService {
  constructor(
    private httpService: HttpService,
    private prismaService: PrismaService,
    private companyService: CompanyService,
  ) {}

  /**
   * Fetches the data
   * @returns The response
   */
  async fetchData(url: string): Promise<AxiosResponse> {
    const response = await this.httpService.axiosRef.get(url);

    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }

    return response;
  }

  /**
   * Gets the provider by code
   * @returns The provider
   */
  async getProviderByCode(code: string): Promise<Provider> {
    const provider = await this.prismaService.provider.findUnique({
      where: {
        code,
      },
    });

    if (!provider) throw new ProviderNotFoundException();

    return provider;
  }

  formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-numeric characters from the phone number
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Check if the cleaned phone number has a valid length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
      // Format the phone number as (123) 456 78 90
      return '(' + match[1] + ') ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }

    // If the phone number doesn't match the expected format, return the original input
    return phoneNumber;
  }

  /**
   * Creates a company with scraped data
   * @returns The created company
   */
  async createCompany(company: Company, provider: Provider): Promise<PrismaCompany> {
    try {
      const companyCreateDto: CompanyCreateDto = {
        name: company.name,
        website: company.website,
        address: company.contact.address,
        email: company.contact.email,
        phone: company.contact.phone,
        sector: company.details.sector,
        providerCode: provider.code,
      };

      const createdCompany = await this.companyService.createCompany(companyCreateDto);

      return createdCompany;
    } catch (error) {
      throw new CompanyCreationException();
    }
  }

  /**
   * Updates changed fields of a company with scraped data
   * @returns Whether the company is updated
   */
  async updateCompany(company: Company, existingCompanies: PrismaCompany[]): Promise<boolean> {
    try {
      let isUpdated: boolean = false;

      const existingCompany = existingCompanies.find((c) => c.name === company.name);
      if (!existingCompany) return;

      const companyUpdateDto: CompanyUpdateDto = {
        updateFields: {},
      };

      const existingCompanyFields = Object.keys(existingCompany);
      existingCompanyFields.forEach((field) => {
        if (field === 'id' || field === 'providerCode') return;
        if (existingCompany[field] === company[field]) return;
        if (company[field] === null || company[field] === undefined || company[field] === '') return;
        companyUpdateDto.updateFields[field] = company[field];
      });

      if (Object.keys(companyUpdateDto.updateFields).length > 0) {
        await this.companyService.updateCompany(existingCompany.id, companyUpdateDto);

        isUpdated = true;
      }

      return isUpdated;
    } catch (error) {
      throw new CompanyCreationException();
    }
  }
}