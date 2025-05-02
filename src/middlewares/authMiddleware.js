import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware para verificar se o token JWT é válido
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Armazena o usuário decodificado para uso posterior
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
};

export default authenticateToken;
