// import { QueryTypes } from "sequelize";
// import { DataBase } from "../../../../../database";

// export const getListCompanyServices = async ({
//   page,
//   limit,
//   search,
// }: {
//   page: any;
//   limit: any;
//   search: string;
// }) => {
//   try {
//     // tenant = tenant ?? -1;
//     const offset = (page - 1) * limit;
//     const limitPage = limit ? `LIMIT ${offset}, ${limit}` : "";

//     search = search?.trim();
//     // lower(concat(u.name, '', u.paternal_lastname)) like concat('%',lower(:fullName), '%')
//     const searchCondition = search
//     ? `
//         (
//           C.id LIKE :search
//           OR LOWER(C.ruc) LIKE CONCAT('%', LOWER(:search), '%')
//           OR LOWER(C.business_name) LIKE CONCAT('%', LOWER(:search), '%')
//           OR LOWER(C.description) LIKE CONCAT('%', LOWER(:search), '%')
//         )
//       `
//     : '1=1';

//     const query = `
//       SELECT 
//           C.id,
//           C.business_name,
//           C.ruc,
//           C.description
//       FROM company AS C
//       ${search ? `WHERE ${searchCondition}` : ''}
//       ORDER BY C.created_date DESC
//       ${limitPage};
//     `;
    
//     const rows = await DataBase.instance.sequelize.query(query, {
//       type: QueryTypes.SELECT,
//       replacements: {
//         search: search
//       },
//     });


//     let countData = 0;

//     countData = await DataBase.instance.company.count({
//       where: {
//         is_deleted: 0,
//       },
//     })

//     const limitFinal = limit !== null ? limit : countData ;

//     const limitForQuery =
//       Math.min(limitFinal, countData) > 0
//         ? Math.max(limitFinal, countData)
//         : limit;

//     const totalPages = Math.ceil(countData / limitForQuery) || 1;
//     const pageFinal = page !== null && !isNaN(page) ? page : 1;

//     console.log(countData);
    
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
