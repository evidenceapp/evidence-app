import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { username: "admin" },
  });
  console.log(existingAdmin);

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin@123", 10);
    await prisma.user.create({
      data: {
        username: "admin",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("✅ Admin padrão criado: admin / admin@123");
  } else {
    console.log("✅ Admin já existe, nada a fazer.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
