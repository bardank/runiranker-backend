import { Router } from "express";
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
    const message = await institutionService.excelToJson(req.file.buffer);
    // return res.status(200).json({ message });
  })
);

export default router;
