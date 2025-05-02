import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota de registro de usuário
router.post("/register", registerUser);

// Rota de login de usuário
router.post("/login", loginUser);

// Rota protegida (somente com token válido)
router.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Acesso autorizado", user: req.user });
});

export default router;
