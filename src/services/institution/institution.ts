import xlsx from "xlsx";
import { InstitutionModel } from "../../models/institution";
import { AffiliatedBy } from "../../types/models";

const excelToJson = async (file: Buffer) => {
  const workbook = xlsx.read(file);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet).filter((v: any) => v.Name);
  console.log(data);

  Promise.all(
    data.map(async (institution: any) => {
      const phone = institution?.["Phone"]
        ?.split(",")
        .map((v: string) => v.trim());
      //   const affiliatedBy: AffiliatedBy[] = institution?.["AffiliatedBy"]
      //     ?.split(",")
      //     .map((v: string) => {
      //       return { label: v, link: "" };
      //     });
      InstitutionModel.create({
        name: institution.Name,
        email: institution.email,
        phone: phone,
        // affiliatedBy: affiliatedBy,
      });
    })
  );

  return data;
};

const institutionService = {
  excelToJson,
};

export default institutionService;
