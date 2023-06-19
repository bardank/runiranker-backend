import { Router, Request, Response } from "express";
import multer from "multer";
import { HttpError } from "../../libs/httpError";
import institutionService from "../../services/institution/institution";
import { catchAsync } from "../../utils/catchAsync";
import { CollegeSearchQuery } from "../../types/searchQueryType";
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

type SearchRequest = Request<any, any, any, CollegeSearchQuery>;

router.get(
  "/search",
  catchAsync(async (req: SearchRequest, res: Response) => {
    const query = req.query;
    console.log({ query });
    if (!query)
      throw new HttpError({
        message: "No query provided",
        code: 400,
        type: "BAD_REQUEST",
      });
    const institutions = await institutionService.searchInstitutions(query);
    res.status(200).json(institutions);
  })
);

//get institution by id
router.get(
  "/:id",
  catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const institution = await institutionService.fetchInstitutionById(id);
    res.status(200).json(institution);
  })
);

export default router;
