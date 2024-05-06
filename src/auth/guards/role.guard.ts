import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const user = request.user;

      if (!user || user.role !== 'admin') {
        throw new UnauthorizedException({
          status: 'error',
          message: 'Unauthorized',
        });
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        status: 'error',
        message: 'Unauthorized',
      });
    }
  }
}
