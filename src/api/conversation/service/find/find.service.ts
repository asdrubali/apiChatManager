// import { QueryTypes } from "sequelize";
// import { DataBase } from "../../../../../database";

import { Op } from "sequelize";
import { _DataBase } from "src/database";

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

export const getListConversationServices = async (userId: number) => {
  try {

     const conversation = await _DataBase.instance.conversation.findAll({
        where:{
            user_id: userId,
            is_deleted: false
        },
      attributes: {
        exclude: [
          "is_deleted",
          "created_date",
          "updated_date",
          "created_by",
          "updated_by",
        ],
      },
    });



    const promises = conversation.map(async (cov) => {
      

      const messagePromise = _DataBase.instance.message.findAll({
          where: {
              conversation_id: cov.id,
              is_deleted: false
          },
          attributes: {
              exclude: [
                  "is_deleted",
                  "created_date",
                  "updated_date",
                  "created_by",
                  "updated_by",
              ],
          },
      });
      
    
      const clientPromise = _DataBase.instance.contact.findAll({
          where: {
              id: {
                  [Op.in]: cov.contacts
              }
          },
          attributes: {
              exclude: [
                  "is_deleted",
                  "created_date",
                  "updated_date",
                  "created_by",
                  "updated_by",
              ],
          },
      });
    
      const [message, client] = await Promise.all([messagePromise, clientPromise]);

      const covPlain = cov.get({ plain: true });
    
      return {
        ...cov.dataValues,
        id: Number(cov.dataValues.id),
          contacts: client,
          messages: message
      };
    });

    const finalData = await Promise.all(promises);

    return finalData


  } catch (error) {
    throw error;
  }
};
