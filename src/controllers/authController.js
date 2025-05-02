import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Função para registrar um novo usuário
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validação do e-mail
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "E-mail inválido. Utilize o formato example@mail.com" });
    }

    // Validação da senha (mínimo 8 caracteres, contendo letras e números)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres, incluindo letras e números." });
    }

    // Verificar se o usuário já existe
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Criar usuário no banco de dados
    await createUser({ username, email, password: hashedPassword });
    
    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Função para fazer login de um usuário
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar o usuário pelo email
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Usuário não encontrado." });

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Senha inválida." });

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
