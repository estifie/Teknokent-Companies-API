import { ConflictException, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { UserCreationException } from '../common/exceptions';
import { Response } from '../common/interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  async createUser(): Promise<Response> {
    try {
      const data = await this.authService.createUser();

      const response: Response = {
        status: 'success',
        data: data,
      };

      return response;
    } catch (error) {
      const response: Response = {
        status: 'error',
        message: undefined,
      };
      switch (error.constructor) {
        case UserCreationException:
          response.message = error.message;
          throw new ConflictException(response);
        default:
          response.message = error.message;
          throw new InternalServerErrorException(response);
      }
    }
  }
}
