import { QueryTypes } from "sequelize";
import { _DataBase } from "src/database";


export const getByIdCompanyServices = async () => {
  try {
    return await _DataBase.instance.template.findAll({
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
  } catch (error) {
    throw error;
  }
};
