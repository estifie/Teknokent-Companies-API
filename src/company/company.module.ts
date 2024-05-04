import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompanyService } from './company.service';

@Module({
  imports: [HttpModule],
  providers: [PrismaService, CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
