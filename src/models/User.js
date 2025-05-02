import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async ({ name, email, password }) => {
  return await prisma.user.create({ data: { name, email, password } });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};
