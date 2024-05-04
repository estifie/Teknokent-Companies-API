import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { prisma } from '../../prisma/prisma.service';
import { UserCreateDto, UserLoginDto, UserResponseDto } from '../dto';
import { UserAuthenticationException, UserCreationException, UserNotFoundException } from '../exceptions';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(userLoginDto: UserLoginDto): Promise<UserResponseDto> {
    const user = await prisma.user.findUnique({
      where: {
        username: userLoginDto.username,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await bcrypt.compare(userLoginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UserAuthenticationException('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    const token = this.generateToken(result);

    return {
      ...result,
      token,
    };
  }

  async createUser(userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userCreateDto.password, saltOrRounds);

    const userExists = await prisma.user.findUnique({
      where: {
        username: userCreateDto.username,
      },
    });

    if (userExists) {
      throw new UserCreationException('User already exists');
    }

    const user = await prisma.user.create({
      data: {
        username: userCreateDto.username,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    const token = this.generateToken(result);

    return {
      ...result,
      token,
    };
  }

  private generateToken(user: any): string {
    const payload = { username: user.username };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
  }
}
