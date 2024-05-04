import { Body, ConflictException, Controller, InternalServerErrorException, NotFoundException, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from '../common/interfaces';
import { UserCreateDto, UserLoginDto, UserResponseDto } from '../dto';
import { UserAuthenticationException, UserCreationException, UserNotFoundException } from '../exceptions';
import { AuthService } from './auth.service';
import { RoleGuard } from './guards/role.guard';

@Controller('auth')
/**
 * Controller responsible for handling authentication-related requests.
 *
 * @remarks
 * This controller provides endpoints for user authentication and user creation.
 */
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles the login request.
   *
   * @param userLoginDto - The user login data.
   * @returns A promise that resolves to the user response data.
   * @throws `NotFoundException` if the user is not found.
   * @throws `UnauthorizedException` if the user authentication fails.
   * @throws `InternalServerErrorException` for any other internal server errors.
   */
  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserResponseDto> {
    try {
      return this.authService.login(userLoginDto);
    } catch (error) {
      const response: Response = {
        status: 'error',
        message: undefined,
      };
      switch (error.constructor) {
        case UserNotFoundException:
          response.message = error.message;
          throw new NotFoundException(response);
        case UserAuthenticationException:
          response.message = error.message;
          throw new UnauthorizedException(response);
        default:
          response.message = error.message;
          throw new InternalServerErrorException(response);
      }
    }
  }

  /**
   * Handles the user creation request.
   *
   * @param userCreateDto - The user creation data.
   * @returns A promise that resolves to the user response data.
   * @throws `ConflictException` if there is a conflict during user creation.
   * @throws `InternalServerErrorException` for any other internal server errors.
   * @remarks
   * This endpoint is guarded by the `RoleGuard`.
   * Only users with the `admin` role can access this endpoint.
   */
  @Post('/')
  @UseGuards(RoleGuard)
  async createUser(@Body() userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    try {
      return this.authService.createUser(userCreateDto);
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
