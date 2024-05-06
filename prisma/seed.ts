import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { PROVIDERS } from '../src/common/constants/providers';

const prisma = new PrismaClient();

async function seedProviders() {
  await prisma.provider.createMany({
    data: PROVIDERS,
    skipDuplicates: true,
  });
}

async function seedUsers() {
  const apiKey = uuidv4();
  const apiKeySecret = await createApiKeySecret();
  const apiKeySecretHash = await createHash(apiKeySecret);

  console.log(`Admin API Key: ${apiKey}`);
  console.log(`Admin API Key Secret: ${apiKeySecret}`);

  await prisma.user.create({
    data: {
      apiKey,
      apiKeySecretHash,
      role: 'admin',
    },
  });
}

async function createApiKeySecret(): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
      }

      resolve(buffer.toString('hex'));
    });
  });
}

async function createHash(secret: string): Promise<string> {
  const saltOrRounds = 10;
  return await bcrypt.hash(secret, saltOrRounds);
}

async function main() {
  await seedUsers();

  await seedProviders();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
