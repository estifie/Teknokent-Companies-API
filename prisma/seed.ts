import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PROVIDERS } from '../src/common/constants/providers';

const prisma = new PrismaClient();

async function seedProviders() {
  await prisma.provider.createMany({
    data: PROVIDERS,
    skipDuplicates: true,
  });
}

async function seedUsers() {
  const defaultUsername = process.env.DEFAULT_USERNAME;
  const defaultPassword = process.env.DEFAULT_PASSWORD;

  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(defaultPassword, saltOrRounds);

  const adminUser = await prisma.user.findFirst({
    where: {
      username: defaultUsername,
    },
  });

  if (adminUser) {
    return;
  }

  await prisma.user.create({
    data: {
      username: defaultUsername,
      password: hashedPassword,
      role: 'admin',
    },
  });
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
