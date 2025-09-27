// prisma/seed.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  const prisma = new PrismaClient();
  const email = "admin@Mkraft-interiors.com";     // Set your admin email here
  const plainPassword = "Mkraft@7176";     // Set your admin password here

  // Hash password with bcrypt
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Upsert admin user (create if not exists, else update)
  await prisma.user.upsert({
    where: { email },
    update: {}, // no update on existing
    create: {
      email,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`✅ Admin user is ready:
  • email: ${email}
  • password: ${plainPassword}
  `);

  await prisma.$disconnect();
}

// Run main function and handle errors
main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
