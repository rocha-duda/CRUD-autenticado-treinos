import express from "express";
import * as treinoController from "../controllers/treinoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", treinoController.create);
router.get("/", treinoController.getAll);
router.get("/:id", treinoController.getById);
router.put("/:id", treinoController.update);
router.patch("/:id", treinoController.update);
router.delete("/:id", treinoController.remove);

export default router;
