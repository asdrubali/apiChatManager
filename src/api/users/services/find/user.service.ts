import {
  FindAttributeOptions,
  QueryTypes,
  Transaction,
  WhereOptions,
} from "sequelize";
import { UserAttributes } from "../../models/user.model";
import { _DataBase } from "src/database";
import { Op } from "sequelize";

const getUsersList = async () => {
  try {

    console.log('entro');
    

    const result = await _DataBase.instance.user.findAll({
      attributes: {
        include: ['name','last_name','user_type','username','email','status']
      },
      where: {
        is_deleted: false
      }
    })

    return result;
  } catch (error) {
    throw error;
  }
};

const findOneUser = async ({
  where,
  attributes,
  transaction,
}: {
  where?: WhereOptions<UserAttributes>;
  attributes?: FindAttributeOptions;
  transaction?: Transaction;
}): Promise<UserAttributes | null> => {
  const user = await _DataBase.instance.user.findOne({
    where,
    attributes,
    transaction,
  });

  if (!user) {
    return null;
  }

  return user.get({ plain: true });
};

const getAccountById = async (userId: number): Promise<any> => {
  try {
    const query = `
        select u.id, u.username, u.email, u.name,u.paternal_lastname, maternal_lastname,
              u.date_of_birth, u.document_type, u.document_number, u.gender,
              coalesce(json_arrayagg( json_object('id', ur.role_id, 'name', r.name, 'rol', r.key_code)), '[]') roles
        from user u
        left join user_role ur
        on u.id = ur.user_id
        left join role r
        on ur.role_id = r.id
        where u.id = ?
        group by u.id;
    `;

    const accountResp = (await _DataBase.instance.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: [userId],
    })) as any[];

    const accountDB = accountResp[0];
    const account: any = {
      ...accountDB,
      roles: JSON.parse(accountDB.roles),
    };

    return account;
  } catch (error) {
    throw error;
  }
};

const findUserInformationById = async (userId: number) => {
  try {
    const query = `
        select  u.id, u.username, u.email, u.name,u.paternal_lastname, maternal_lastname, u.date_of_birth, u.status,
                u.document_type, u.document_number,
                u.document_type,
                u.document_number,
                u.gender,
                coalesce(json_arrayagg( json_object('id', ur.role_id, 'name', r.name)), '[]') roles
        from user u
        left join user_role ur
        on u.id = ur.user_id
        left join role r
        on ur.role_id = r.id
        where u.id = ?
        group by u.id
    `;

    const resp = (await _DataBase.instance.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: [userId],
    })) as any[];

    if (resp.length == 0) {
      return null;
    }

    const dbUser = resp[0];

    const id_rol = JSON.parse(dbUser.roles);

    const fid_rol = id_rol[0].id;

    const userInformation: any = {
      ...dbUser,
      status: !!dbUser.status,
      roles: fid_rol === null ? JSON.parse("[]") : JSON.parse(dbUser.roles),
    };

    return userInformation;
  } catch (error) {
    throw error;
  }
};

export const findUserById = async ({
  id,
  attributes,
}: {
  id: number
  attributes?: FindAttributeOptions
}): Promise<UserAttributes> => {
  try {
    return (
      await _DataBase.instance.user.findOne({
        where: {
          [Op.and]: {
            id,
            is_deleted: false,
          },
        },
        attributes,
      })
    )?.get({ plain: true })!
  } catch (err) {
    throw err
  }
}

export { getUsersList, findOneUser, getAccountById, findUserInformationById };
