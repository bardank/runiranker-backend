import { NextFunction, Request, Response, Router } from "express";
import router from "../../routes";
import { catchAsync } from "../../utils/catchAsync";
import authService from "../../services/auth/";
import { LoginPayload } from "../../types/auth";

interface LoginRequest extends Request {
    body:  LoginPayload;
}

router.post(
  "/login",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    return res.status(200).json({ token });
  })
);

export default router;
