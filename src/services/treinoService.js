import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createTreino(data) {
  return await prisma.treino.create({ data });
}

export async function getTreinosByUser(userId) {
  return await prisma.treino.findMany({ where: { userId } });
}

export async function getTreinoById(id, userId) {
  return await prisma.treino.findFirst({ where: { id, userId } });
}

export async function updateTreino(id, userId, data) {
  return await prisma.treino.updateMany({
    where: { id, userId },
    data
  });
}

export async function deleteTreino(id, userId) {
  return await prisma.treino.deleteMany({ where: { id, userId } });
}
