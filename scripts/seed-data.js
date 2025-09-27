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

  // Sample project data
  const projects = [
    {
      title: "Luxury Modern Villa",
      description: "A stunning contemporary home featuring clean lines and premium finishes",
      location: "Beverly Hills, CA",
      date: new Date("2023-12-01"),
      client: "Private Residence",
      type: "Residential",
      featured: true,
      images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"],
      mainImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
    }
  ];

  // Seed projects
  for (const project of projects) {
    await prisma.project.upsert({
      where: { title: project.title },
      update: {},
      create: project,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
