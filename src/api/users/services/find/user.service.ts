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

const getUsersList = async (
  options: { page?: number; limit?: number; filters?: any } | undefined
) => {
  try {
    const { page, limit, filters } = options || {};

    // Por defecto para que no se concideren en el where
    const { fullName = "", userStatus = -1 } = filters || {};
    const replacements = {
      fullName,
      userStatus,
    };

    const qColumns = `
      u.id, u.name, u.paternal_lastname, u.maternal_lastname,
      u.date_of_birth, u.username, u.email, 
      u.status, u.created_date,
      u.document_type, u.document_number, u.gender
  `;

    const qSelect = `
      select {{columns}}
      from user u
    `;

    const qWhere = `
      where 
        1 = 1
        && ( :fullName is null or :fullName = '' or lower(concat(u.name, ' ', u.maternal_lastname, ' ', u.paternal_lastname)) like concat('%',lower(:fullName), '%') )
        && ( -1 = :userStatus or u.status = :userStatus )

    `;

    const qOrderBy = `order by u.created_date desc`;

    const result = await paginatedListGenerator({
      structure: {
        qColumns,
        qSelect,
        qWhere,
        qOrderBy,
      },
      limit,
      page,
      replacements,
    });

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
