import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Função para registrar um novo usuário
export const registerUserService = async ({ name, email, password }) => {
  // Verificar se o usuário já existe
  const userExists = await findUserByEmail(email);
  if (userExists) {
    throw new Error("Usuário já existe");
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Criar usuário no banco de dados
  const newUser = await createUser({ name, email, password: hashedPassword });
  
  return newUser;
};

// Função para fazer login de um usuário
export const loginUserService = async ({ email, password }) => {
  // Buscar o usuário pelo email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  // Verificar se a senha está correta
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha inválida.");
  }

  // Gerar o token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};
