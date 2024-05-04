import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CommonModule } from '../common/common.module';
import { CompanyModule } from '../company/company.module';
import { AnkaraUniversityService, AsoTeknoparkService, HacettepeService, OdtuService, TeknoparkAnkaraService } from './ankara.service';
import { ProvidersController } from './providers.controller';

@Module({
  imports: [HttpModule, CommonModule, CompanyModule],
  providers: [HacettepeService, OdtuService, AnkaraUniversityService, PrismaService, TeknoparkAnkaraService, AsoTeknoparkService],
  controllers: [ProvidersController],
  exports: [HacettepeService, OdtuService, AnkaraUniversityService, TeknoparkAnkaraService, AsoTeknoparkService],
})
export class ProvidersModule {}
