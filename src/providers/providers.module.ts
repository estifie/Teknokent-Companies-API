import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CommonModule } from '../common/common.module';
import { AnkaraUniversityService, HacettepeService, OdtuService, TeknoparkAnkaraService } from './ankara.service';
import { ProvidersController } from './providers.controller';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [HttpModule, CommonModule, CompanyModule],
  providers: [HacettepeService, OdtuService, AnkaraUniversityService, PrismaService, TeknoparkAnkaraService],
  controllers: [ProvidersController],
  exports: [HacettepeService, OdtuService, AnkaraUniversityService, TeknoparkAnkaraService],
})
export class ProvidersModule {}
