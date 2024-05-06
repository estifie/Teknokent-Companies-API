import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';
import { UserCreateResponseDto } from '../common/dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async createUser(): Promise<UserCreateResponseDto> {
    try {
      const apiKey = uuidv4();
      const apiKeySecret = await this.createApiKeySecret();
      const apiKeySecretHash = await this.createHash(apiKeySecret);

      await this.prismaService.user.create({
        data: {
          apiKey,
          apiKeySecretHash,
          role: 'user',
        },
      });

      return {
        apiKey,
        apiKeySecret,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async createApiKeySecret(): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(32, (err, buffer) => {
        if (err) {
          reject(err);
        }

        resolve(buffer.toString('hex'));
      });
    });
  }

  private async createHash(secret: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(secret, saltOrRounds);
  }
}
