import { NextFunction, Request, Response, Router } from "express";
import { catchAsync } from "../../utils/catchAsync";
import authService from "../../services/auth/";
import { LoginPayload, RegisterPayload } from "../../types/auth";
const router = Router();

interface LoginRequest extends Request {
  body: LoginPayload;
}

router.post(
  "/login",
  catchAsync(async (req: LoginRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    return res.status(200).json({ user });
  })
);

interface RegisterRequest extends Request {
  body: RegisterPayload;
}

router.post(
  "/register",
  catchAsync(
    async (req: RegisterRequest, res: Response, next: NextFunction) => {
      const { name, email, password } = req.body;

      const user = await authService.register(name, email, password);
      return res.status(200).json({ user });
    }
  )
);

export default router;
