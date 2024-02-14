
// // import { CreateCompanytDto } from "../../dto/create_partner.dto";

// import { _DataBase } from "src/database";

// export const createPartnerService = async ({
//   createCompanyDto,
//   createBy,
// }: {
//   createCompanyDto: any;
//   createBy: number;
// }) => {
//   const ts = await _DataBase.instance.sequelize.transaction();
//   try {
//     const new_specialty = await _DataBase.instance.user.create(
//       {
//         id: 0,
//         ...createCompanyDto,
//         created_by: createBy,
//       },
//       {
//         transaction: ts,
//       }
//     );

//     await ts.commit();

//     return new_specialty;
//   } catch (error) {
//     await ts.rollback();
//     throw error;
//   }
// };
