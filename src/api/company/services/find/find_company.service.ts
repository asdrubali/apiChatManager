// import { QueryTypes } from "sequelize";
// import { _DataBase } from "src/database";

// export const getListCompanyServices = async () => {
//   try {
//     const rows = await _DataBase.instance.

    
//     return {
//       totalPages,
//       page: pageFinal,
//       limit: limitForQuery,
//       count: countData ||  0,
//       data: rows,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// export const getByIdCompanyServices = async ({
//   companyId,
// }: {
//   companyId: number;
// }) => {
//   try {
//     return await DataBase.instance.company.findByPk(companyId, {
//       attributes: {
//         exclude: [
//           "is_deleted",
//           "created_date",
//           "updated_date",
//           "created_by",
//           "updated_by",
//         ],
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// };
