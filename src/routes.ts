import { Router } from "express";
import authRoutes from "./routes/auth";
import institutionRoutes from "./routes/institution";
const router = Router();

router.use("/auth", authRoutes);
router.use("/institution", institutionRoutes);


export default router;
