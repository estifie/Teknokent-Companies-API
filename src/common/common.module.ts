import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompanyModule } from '../company/company.module';
import { CommonService } from './common.service';

@Module({
  imports: [HttpModule, CompanyModule],
  providers: [CommonService, PrismaService],
  exports: [CommonService],
})
export class CommonModule {}
