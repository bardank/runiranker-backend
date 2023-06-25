import xlsx from "xlsx";
import { InstitutionModel } from "../../models/institution";
import { CollegeSearchQuery } from "../../types/searchQueryType";

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

const searchInstitutions = async (searchQuery: CollegeSearchQuery) => {
  let { page, limit, slug } = searchQuery;

  const searchWords = slug.split(" ").concat(slug);

  const query = {
    $or: searchWords.map((word) => ({
      $or: [
        { name: { $regex: word, $options: "i" } },
        { programs: { $regex: word, $options: "i" } },
        { about: { $regex: word, $options: "i" } },
      ],
    })),
  };

  //   console.log(searchWords, query);

  const institutions = await InstitutionModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  return institutions;
};

const fetchInstitutionById = async (id: string) => {
  const institution = await InstitutionModel.findById(id);
  return institution;
};

const institutionService = {
  excelToJson,
  searchInstitutions,
  fetchInstitutionById,
};

export default institutionService;
