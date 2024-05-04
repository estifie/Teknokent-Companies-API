import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../../prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = await this.jwtService.verify(
        token.toString().replace('Bearer ', ''),
        {
          secret: process.env.JWT_SECRET,
        },
      );

      const user = decoded as User;

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const foundUser = await prisma.user.findUnique({
        where: {
          username: user.username,
        },
      });

      if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = foundUser;

      req['user'] = result;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
