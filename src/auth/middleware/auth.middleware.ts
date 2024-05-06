import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../../prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const [apiKeyDecoded, apiKeySecretDecoded] = Buffer.from(apiKey, 'base64').toString().split(':');

    if (!apiKeyDecoded || !apiKeySecretDecoded) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: {
        apiKey: apiKeyDecoded,
      },
    });

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const isApiKeySecretValid = await bcrypt.compare(apiKeySecretDecoded, user.apiKeySecretHash);

    if (!isApiKeySecretValid) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    req['user'] = user;

    next();
  }
}
