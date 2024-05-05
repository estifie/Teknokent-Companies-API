import { Injectable } from '@nestjs/common';
import { Provider } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { decode } from 'cf-email-decoder';
import * as cheerio from 'cheerio';
import { PrismaService } from '../../prisma/prisma.service';
import { CommonService } from '../common/common.service';
import { Sector, getSector } from '../common/constants/sectors';
import { Company } from '../common/interfaces';

@Injectable()
export class OdtuService {
  private rootHtml: cheerio.CheerioAPI;
  private provider: Provider;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Scrapes the companies and saves them to the database
   * @returns The number of created and updated companies
   */
  async scrapeCompanies(): Promise<[number, number]> {
    try {
      this.provider = await this.commonService.getProviderByCode('odtu');
      const response = await this.commonService.fetchData(this.provider.website);
      this.rootHtml = cheerio.load(response.data);
      return await this.getCompanies();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Parses the companies
   * @returns The number of created companies
   */
  async getCompanies(): Promise<[number, number]> {
    const rows = this.rootHtml('div section div.container table.table tbody').find('tr');

    let createdCompanies: number = 0;
    let updatedCompanies: number = 0;

    const existingCompanies = await this.prismaService.company.findMany({
      where: {
        providerId: this.provider.id,
      },
    });

    for (const row of rows) {
      const columns = this.rootHtml(row).find('td');

      const company: Company = {
        name: this.rootHtml(columns[0]).text(),
        website: this.rootHtml(columns[1]).text(),
        contact: {
          address: undefined,
          email: undefined,
          phone: undefined,
        },
        details: {
          sector: undefined,
        },
      };

      if (!existingCompanies.find((c) => c.name.toLocaleUpperCase('tr-TR') === company.name.toLocaleUpperCase('tr-TR'))) {
        const createdCompany = await this.commonService.createCompany(company, this.provider);
        if (createdCompany) createdCompanies++;
      } else {
        const isUpdated = await this.commonService.updateCompany(company, existingCompanies);
        if (isUpdated) updatedCompanies++;
      }
    }

    return [createdCompanies, updatedCompanies];
  }
}

@Injectable()
export class HacettepeService {
  private rootHtml: cheerio.CheerioAPI;
  private provider: Provider;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Scrapes the companies and saves them to the database
   * @returns The number of created and updated companies
   */
  async scrapeCompanies(): Promise<[number, number]> {
    try {
      this.provider = await this.commonService.getProviderByCode('hacettepe');
      const response = await this.commonService.fetchData(this.provider.website + '/tr/firma_rehberi');
      this.rootHtml = cheerio.load(response.data);
      return await this.getCompanies();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Parses the companies
   * @returns The number of created companies
   */
  async getCompanies(): Promise<[number, number]> {
    let createdCompanies: number = 0;
    let updatedCompanies: number = 0;

    const existingCompanies = await this.prismaService.company.findMany();
    const sections = this.rootHtml('div.kisayol_f_baslik');

    for (const section of sections) {
      const sectionUrl = this.provider.website + this.rootHtml(section).find('a').attr('href');
      const sectorTitle = this.rootHtml(section).find('a').text();
      const sector: Sector = getSector(sectorTitle);
      const sectionData = await this.commonService.fetchData(sectionUrl);

      const companies = await this.parseSections(sectionData, sector);

      for (const company of companies) {
        if (!existingCompanies.find((c) => c.name.toLocaleUpperCase('tr-TR') === company.name.toLocaleUpperCase('tr-TR'))) {
          const createdCompany = await this.commonService.createCompany(company, this.provider);
          if (createdCompany) createdCompanies++;
        } else {
          const isUpdated = await this.commonService.updateCompany(company, existingCompanies);
          if (isUpdated) updatedCompanies++;
        }
      }
    }

    return [createdCompanies, updatedCompanies];
  }

  /**
   * Parses the sections
   * @returns The companies
   */
  async parseSections(sectionData: AxiosResponse, sector: Sector): Promise<Company[]> {
    const companies: Company[] = [];
    const sectionHtml = cheerio.load(sectionData.data);
    const companiesData = sectionHtml('div.firma');

    for (const companyData of companiesData) {
      try {
        const company = await this.parseCompany(sectionHtml, companyData, sector);
        companies.push(company);
      } catch (error) {
        throw error;
      }
    }

    return companies;
  }

  /**
   * Parses the company
   * @returns The company
   */
  async parseCompany(sectionHtml: cheerio.CheerioAPI, companyData: cheerio.Element, sector: Sector): Promise<Company> {
    const companyName = sectionHtml(companyData).find('div.firma_adi').text();
    const companyImage = sectionHtml(companyData).find('div.firma_resim').find('img').attr('src');
    const companyDetailsUrl = this.provider.website + sectionHtml(companyData).find('a').attr('href');

    const companyResponse = await this.commonService.fetchData(companyDetailsUrl);

    if (companyResponse.status !== 200) {
      throw new Error('Failed to fetch data');
    }

    const company: Company = {
      name: companyName,
      website: undefined,
      contact: {
        address: undefined,
        email: undefined,
        phone: undefined,
      },
      details: {
        sector: sector,
      },
    };

    const companyDetailsHtml = cheerio.load(companyResponse.data);

    companyDetailsHtml('.firma_detay_bilgi').each((index, element) => {
      const iconClass = companyDetailsHtml(element).find('i').attr('class');

      switch (iconClass) {
        case 'fa-solid fa-square-phone':
          company.contact.phone = companyDetailsHtml(element).text().trim();
          break;

        case 'fa-solid fa-square-envelope':
          company.contact.email = companyDetailsHtml(element).text().trim();
          break;

        case 'fa-solid fa-arrow-pointer':
          company.website = companyDetailsHtml(element).text().trim();
          break;
      }
    });

    if (company.website.includes('http://')) {
      company.website = company.website.replace('http://', 'https://');
    }

    if (company.website.split('https://').length > 2) {
      const splitWebsite = company.website.split('https://');
      company.website = 'https://' + splitWebsite[splitWebsite.length - 1];
    }

    return company;
  }
}

@Injectable()
export class AnkaraUniversityService {
  private rootHtml: cheerio.CheerioAPI;
  private provider: Provider;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Scrapes the companies and saves them to the database
   * @returns The number of created and updated companies
   */
  async scrapeCompanies(): Promise<[number, number]> {
    try {
      this.provider = await this.commonService.getProviderByCode('ankarauniversity');
      const response = await this.commonService.fetchData(this.provider.website);
      this.rootHtml = cheerio.load(response.data);
      return await this.getCompanies();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets the companies
   * @returns The number of created companies
   */
  async getCompanies(): Promise<[number, number]> {
    let createdCompanies: number = 0;
    let updatedCompanies: number = 0;

    const existingCompanies = await this.prismaService.company.findMany();

    const companies = await this.parseCompanies();

    for (const company of companies) {
      if (!existingCompanies.find((c) => c.name.toLocaleUpperCase('tr-TR') === company.name.toLocaleUpperCase('tr-TR'))) {
        const createdCompany = await this.commonService.createCompany(company, this.provider);
        if (createdCompany) createdCompanies++;
      } else {
        const isUpdated = await this.commonService.updateCompany(company, existingCompanies);
        if (isUpdated) updatedCompanies++;
      }
    }

    return [createdCompanies, updatedCompanies];
  }

  /**
   * Parses the companies
   * @returns The companies
   */
  async parseCompanies(): Promise<Company[]> {
    const companies: Company[] = [];
    const companiesData = this.rootHtml('div.eael-filterable-gallery-item-wrap');

    for (const companyData of companiesData) {
      const company = await this.parseCompany(companyData);
      companies.push(company);
    }

    return companies;
  }

  /**
   * Parses the company
   * @returns The company
   */
  async parseCompany(companyData: cheerio.Element): Promise<Company> {
    const companyClasses = this.rootHtml(companyData).attr('class').split(' ');
    const sector = await this.parseCompanySector(companyClasses);

    const companyHtml = this.rootHtml(companyData).find('div.gallery-item-caption-over');

    const name = companyHtml.find('h5.fg-item-title').text();
    const content = companyHtml.find('div.fg-item-content p').html();

    let phone: string, email: string, website: string;

    if (content) {
      content.split('<br>').forEach((text) => {
        text = text.trim();
        if (text.startsWith('+90')) phone = text.replace('&nbsp;', '');
        // <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="345d5a525b745557405d5a5b565d5b4051575c1a575b59">[email&nbsp;protected]</a>
        else if (text.includes('/cdn-cgi/l/email-protection')) email = decode(text.split('data-cfemail="')[1].split('">')[0]);
        else if (text.startsWith('www')) website = text;
      });
    }

    const company: Company = {
      name: name,
      website: website,
      contact: {
        address: undefined,
        email: email,
        phone: phone,
      },
      details: {
        sector,
      },
    };

    return company;
  }

  /**
   * Parses the company sector
   * @returns The company sector
   */
  async parseCompanySector(companyClasses: string[]): Promise<Sector> {
    const sector = companyClasses.find((c: string) => c.includes('eael-cf-'));

    return getSector(sector);
  }
}

@Injectable()
export class TeknoparkAnkaraService {
  private rootHtml: cheerio.CheerioAPI;
  private provider: Provider;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Scrapes the companies and saves them to the database
   * @returns The number of created and updated companies
   */
  async scrapeCompanies(): Promise<[number, number]> {
    try {
      this.provider = await this.commonService.getProviderByCode('teknoparkankara');
      const response = await this.commonService.fetchData(this.provider.website);
      this.rootHtml = cheerio.load(response.data);
      return await this.getCompanies();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets the companies
   * @returns The number of created companies
   */
  async getCompanies(): Promise<[number, number]> {
    let createdCompanies: number = 0;
    let updatedCompanies: number = 0;

    const existingCompanies = await this.prismaService.company.findMany();

    const companies = await this.parseCompanies();

    for (const company of companies) {
      if (!existingCompanies.find((c) => c.name.toLocaleUpperCase('tr-TR') === company.name.toLocaleUpperCase('tr-TR'))) {
        await this.commonService.createCompany(company, this.provider);
        createdCompanies++;
      } else {
        const isUpdated = await this.commonService.updateCompany(company, existingCompanies);
        if (isUpdated) updatedCompanies++;
      }
    }

    return [createdCompanies, updatedCompanies];
  }

  /**
   * Parses the companies
   * @returns The companies
   */
  async parseCompanies(): Promise<Company[]> {
    const companies: Company[] = [];
    const companiesData = this.rootHtml('li.f1_container');

    for (const companyData of companiesData) {
      const company = await this.parseCompany(companyData);
      companies.push(company);
    }

    return companies;
  }

  /**
   * Parses the company
   * @returns The company
   */
  async parseCompany(companyData: cheerio.Element): Promise<Company> {
    const companyHtml = this.rootHtml(companyData);

    const name = companyHtml.find('h3').attr('dt-aciklama');
    const phone = companyHtml.find('p:contains("Telefon") i').text();
    const sector = companyHtml.find('p:contains("Sektör") i').text();
    const contactPerson = companyHtml.find('p:contains("Yetkili") i').text();
    const website = companyHtml.find('p:contains("Web") i').text();

    const company: Company = {
      name: name,
      website: website,
      contact: {
        address: undefined,
        email: undefined,
        phone: phone,
      },
      details: {
        sector: getSector(sector),
      },
    };

    return company;
  }
}

@Injectable()
export class AsoTeknoparkService {
  private rootHtml: cheerio.CheerioAPI;
  private provider: Provider;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Scrapes the companies and saves them to the database
   * @returns The number of created and updated companies
   */
  async scrapeCompanies(): Promise<[number, number]> {
    try {
      this.provider = await this.commonService.getProviderByCode('asoteknopark');
      const response = await this.commonService.fetchData(this.provider.website);
      this.rootHtml = cheerio.load(response.data);
      return await this.getCompanies();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets the companies
   * @returns The number of created companies
   */
  async getCompanies(): Promise<[number, number]> {
    let createdCompanies: number = 0;
    let updatedCompanies: number = 0;

    const existingCompanies = await this.prismaService.company.findMany();

    const companies = await this.parseCompanies();

    for (const company of companies) {
      if (!company) continue;

      if (!existingCompanies.find((c) => c.name.toLocaleUpperCase('tr-TR') === company.name.toLocaleUpperCase('tr-TR'))) {
        const createdCompany = await this.commonService.createCompany(company, this.provider);
        if (createdCompany) createdCompanies++;
      } else {
        const isUpdated = await this.commonService.updateCompany(company, existingCompanies);
        if (isUpdated) updatedCompanies++;
      }
    }

    return [createdCompanies, updatedCompanies];
  }

  /**
   * Parses the companies
   * @returns The companies
   */
  async parseCompanies(): Promise<Company[]> {
    const companies: Company[] = [];
    const companiesTable = this.rootHtml('div.entry-content table tbody tr');

    const parsePromises = companiesTable.map(async (index, companyData) => {
      if (index === 0) return;

      return await this.parseCompany(companyData);
    });

    const parsedCompanies = await Promise.all(parsePromises);

    companies.push(...parsedCompanies);

    console.log(companies);

    return companies;
  }

  /**
   * Parses the company
   * @returns The company
   */
  async parseCompany(companyData: cheerio.Element): Promise<Company> {
    const fields = this.rootHtml(companyData).find('td');

    const name = this.rootHtml(fields[0]).text().trim();
    const sector = this.rootHtml(fields[1]).text().trim();
    const email = this.rootHtml(fields[2]).text().trim();
    const website = this.rootHtml(fields[3]).text().trim();
    const phone = this.rootHtml(fields[4]).text().trim();

    const company: Company = {
      name: name,
      website: website,
      contact: {
        address: undefined,
        email: email,
        phone: phone,
      },
      details: {
        sector: getSector(sector),
      },
    };

    return company;
  }
}

@Injectable()
export class GaziUniversityService {
  private provider: Provider;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  /**
   * Scrapes the companies and saves them to the database
   * @returns The number of created and updated companies
   */
  async scrapeCompanies(): Promise<[number, number]> {
    try {
      this.provider = await this.commonService.getProviderByCode('gaziuniversity');
      const response = await this.commonService.fetchData(this.provider.website);
      return await this.getCompanies(response);
    } catch (error) {
      throw error;
    }
  }

  async getCompanies(response: AxiosResponse): Promise<[number, number]> {
    let createdCompanies: number = 0;
    let updatedCompanies: number = 0;

    const existingCompanies = await this.prismaService.company.findMany();

    const companies = await this.parseCompanies(response);

    for (const company of companies) {
      if (!existingCompanies.find((c) => c.name.toLocaleUpperCase('tr-TR') === company.name.toLocaleUpperCase('tr-TR'))) {
        const createdCompany = await this.commonService.createCompany(company, this.provider);
        if (createdCompany) createdCompanies++;
      } else {
        const isUpdated = await this.commonService.updateCompany(company, existingCompanies);
        if (isUpdated) updatedCompanies++;
      }
    }

    return [createdCompanies, updatedCompanies];
  }

  async parseCompanies(response: AxiosResponse): Promise<Company[]> {
    const companies: Company[] = [];
    const companiesList = [];

    for (const part of response.data.data) {
      const companies = part['unitUi'];

      companiesList.push(...companies);
    }

    for (const companyData of companiesList) {
      const company = await this.parseCompany(companyData.unit);
      companies.push(company);
    }

    return companies;
  }

  async parseCompany(companyData: any): Promise<Company> {
    const company: Company = {
      name: companyData.name,
      website: companyData.description,
      contact: {
        address: undefined,
        email: undefined,
        phone: undefined,
      },
      details: {
        sector: undefined,
      },
    };

    console.log(companyData.name);

    return company;
  }
}
