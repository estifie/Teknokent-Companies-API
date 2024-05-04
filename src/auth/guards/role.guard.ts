import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();

      const user = request.user;

      if (!user || user.role !== 'admin') {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
