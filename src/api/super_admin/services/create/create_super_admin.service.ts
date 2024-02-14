
// import { CreateCompanytDto } from "../../dto/create_super_admin.dto";

import { _DataBase } from "src/database";


export const createSuperAdminService = async ({
  createCompanyDto,
  createBy
}: {
  createCompanyDto: any;
  createBy: number;
}) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {
    const new_user = await _DataBase.instance.user.create(
      {
        id: 0,
        ...createCompanyDto,
        // created_by: createBy,
      },
      {
        transaction: ts,
      }
    );

    await ts.commit();

    return new_user;
  } catch (error) {
    await ts.rollback();
    throw error;
  }
};
