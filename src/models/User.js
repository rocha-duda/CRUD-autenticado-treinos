import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Função para criar um novo usuário
export const createUser = async ({ username, email, password }) => {
  return await prisma.user.create({
    data: {
      username,  // Adiciona o campo `username` no objeto de criação
      email,
      password
    }
  });
};

// Função para encontrar um usuário pelo e-mail
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};
