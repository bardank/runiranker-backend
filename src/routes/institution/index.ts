import { Router, Request, Response } from "express";
import multer from "multer";
import { HttpError } from "../../libs/httpError";
import institutionService from "../../services/institution/institution";
import { catchAsync } from "../../utils/catchAsync";
const router = Router();

interface UploadRequest extends Request {
  file: Express.Multer.File;
}

router.post(
  "/import",
  multer({ storage: multer.memoryStorage() }).single("excel"),
  catchAsync(async (req: UploadRequest, res: Response) => {
    if (!req.file?.buffer) {
      throw new HttpError({
        message: "No file uploaded",
        code: 400,
        type: "BAD_REQUEST",
      });
    }
    const institutions = await institutionService.excelToJson(req.file.buffer);
    res.status(200).json({ message: "Institutions imported successfully" });
  })
);

export default router;
