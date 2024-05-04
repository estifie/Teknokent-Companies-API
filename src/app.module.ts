import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { CommonModule } from './common/common.module';
import { CompanyModule } from './company/company.module';
import { ProvidersController } from './providers/providers.controller';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    CommonModule,
    CompanyModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
    // For serving static files
    ServeStaticModule.forRoot({
      // Added 1 more '..' to go back from 'dist' folder
      rootPath: join(__dirname, '..', '..', 'public'),
      exclude: ['/api/*'],
      serveRoot: '/public',
    }),
    ProvidersModule,
  ],
  controllers: [ProvidersController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(`admin/*`);
    consumer.apply(AuthMiddleware).forRoutes({
      path: `auth/`,
      method: RequestMethod.POST,
    });
  }
}
