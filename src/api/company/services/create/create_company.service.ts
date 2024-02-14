// import { _DataBase } from "src/database";
// import { CreateCompanytDto } from "../../dto/create_company.dto";

// export const createCompanyService = async ({
//   dataBody,
//   createBy,
// }: {
//   dataBody: any;
//   createBy: number;
// }) => {
//   const ts = await _DataBase.instance.sequelize.transaction();
//   try {
//     // const new_specialty = await _DataBase.instance.company.create(
//     //   {
//     //     id: 0,
//     //     ...createCompanyDto,
//     //     created_by: createBy,
//     //   },
//     //   {
//     //     transaction: ts,
//     //   }
//     // );

//     await ts.commit();

//     return "ok";
//   } catch (error) {
//     await ts.rollback();
//     throw error;
//   }
// };
