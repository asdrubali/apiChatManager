import {
  FindAttributeOptions,
  QueryTypes,
  Transaction,
  WhereOptions,
} from "sequelize";
import { UserAttributes } from "../../models/user.model";
import { IDbUserAccount, IUserAccount } from "../../interfaces/user-account";
import {
  IDBUserInformation,
  IUserInformation,
} from "../../interfaces/user-query-list";
import { _DataBase } from "src/database";

const getUsersList = async () => {
  try {

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

const getAccountById = async (userId: number): Promise<IUserAccount> => {
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
    })) as IDbUserAccount[];

    const accountDB = accountResp[0];
    const account: IUserAccount = {
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
    })) as IDBUserInformation[];

    if (resp.length == 0) {
      return null;
    }

    const dbUser = resp[0];

    const id_rol = JSON.parse(dbUser.roles);

    const fid_rol = id_rol[0].id;

    const userInformation: IUserInformation = {
      ...dbUser,
      status: !!dbUser.status,
      roles: fid_rol === null ? JSON.parse("[]") : JSON.parse(dbUser.roles),
    };

    return userInformation;
  } catch (error) {
    throw error;
  }
};

export { getUsersList, findOneUser, getAccountById, findUserInformationById };
