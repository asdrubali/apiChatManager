// import { DataBase } from "../../../../../database";
// import { UpdateCompanyDto } from "../../dto/update_partner.dto";

// export const updateByIdCompanyService = async ({
//   company_id,
//   updateDto,
//   userId,
// }: {
//   company_id: number;
//   updateDto: UpdateCompanyDto;
//   userId: number;
// }) => {
//   const ts = await DataBase.instance.sequelize.transaction();
//   try {
//     const existingCompany = await DataBase.instance.company.findOne({
//       where: {
//         id: company_id,
//         is_deleted: false,
//       },
//     });

//     // Si el campus no existe, manejar el caso según tus necesidades
//     if (!existingCompany) {
//       return existingCompany;
//     }

//     const updated_company = await DataBase.instance.company.update(
//       {
//         ...updateDto,
//         updated_date: new Date(),
//         updated_by: userId,
//       },
//       {
//         where: {
//           id: company_id,
//         },
//         transaction: ts,
//       }
//     );

//     await ts.commit();

//     return updated_company;
//   } catch (err) {
//     await ts.rollback();
//     throw err;
//   }
// };


// export const deletedByIdCompanyServices = async ({
//   company_id,
//   userId,
// }: {
//   company_id: number;
//   userId: number;
// }) => {
//   const ts = await DataBase.instance.sequelize.transaction();
//   try {
//     const existing = await DataBase.instance.company.findOne({
//       where: {
//         id: company_id,
//         is_deleted: false,
//       },
//     });

//     // Si el campus no existe, manejar el caso según tus necesidades
//     if (!existing) {
//       return existing;
//     }

//     const result = await DataBase.instance.company.update(
//       {
//         is_deleted: true,
//         updated_by: userId,
//         updated_date: new Date(),
//       },
//       {
//         where: {
//           id: company_id,
//         },
//         transaction: ts,
//       }
//     );

//     await ts.commit();

//     return result;
//   } catch (err) {
//     await ts.rollback();
//     throw err;
//   }
// };
