import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CommonModule } from '../common/common.module';
import { CompanyModule } from '../company/company.module';
import {
  AnkaraUniversityService,
  AsoTeknoparkService,
  GaziUniversityService,
  HacettepeService,
  OdtuService,
  OstimTeknoparkService,
  TeknoparkAnkaraService,
} from './ankara.service';
import { ProvidersController } from './providers.controller';

@Module({
  imports: [HttpModule, CommonModule, CompanyModule],
  providers: [
    HacettepeService,
    OdtuService,
    AnkaraUniversityService,
    PrismaService,
    TeknoparkAnkaraService,
    AsoTeknoparkService,
    GaziUniversityService,
    OstimTeknoparkService,
  ],
  controllers: [ProvidersController],
  exports: [HacettepeService, OdtuService, AnkaraUniversityService, TeknoparkAnkaraService, AsoTeknoparkService, GaziUniversityService, OstimTeknoparkService],
})
export class ProvidersModule {}
