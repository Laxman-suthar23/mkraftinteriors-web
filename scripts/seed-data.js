require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  // Create admin user
  const hashedPassword = await bcrypt.hash('Mkraft@7176', 12);
  await prisma.user.upsert({
    where: { email: 'admin@Mkraftinteriors.com' },
    update: {},
    create: {
      email: 'admin@Mkraftinteriors.com',
      password: hashedPassword,
      role: 'admin',
    },
  });
  }
  console.log('✅ Database seeded successfully!');
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
