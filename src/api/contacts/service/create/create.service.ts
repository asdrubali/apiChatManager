import { _DataBase } from "src/database";


export const createContactService = async ({
  dataBody,
  createBy,
}: {
  dataBody: any;
  createBy: number;
}) => {
  const ts = await _DataBase.instance.sequelize.transaction();
  try {
    const new_contact = await _DataBase.instance.contact.create(
      {
        id: 0,
        ...dataBody,
        created_by: createBy,
      },
      {
        transaction: ts,
      }
    );

    await ts.commit();

    return new_contact;
  } catch (error) {
    await ts.rollback();
    throw error;
  }
};
