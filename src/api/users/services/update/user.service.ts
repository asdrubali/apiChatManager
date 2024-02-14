import moment from "moment";
import bcrypt from "bcrypt";
import { Transaction, WhereOptions } from "sequelize";


import { UserPartialAttributes, UserAttributes } from "../../models/user.model";
import { UpdateUserDto } from "../../dtos/update-user.dto";

import { _DataBase } from "src/database";
import { encrypt } from "src/api/security/criptoService";

export const updateUserPassword = async ({
  password,
  userId,
  updatedBy,
  transaction,
}: {
  password: string;
  userId: number;
  updatedBy?: number;
  transaction?: Transaction;
}) => {
  try {
    const { hash: encryptedPassword, salt } = await encrypt(password);

    return await _DataBase.instance.user.update(
      {
        password: encryptedPassword,
        salt,
        updated_by: updatedBy,
        updated_date: new Date(),
      },
      {
        where: {
          id: userId,
        },
        transaction,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const basicUpdateUserById = async ({
  userId,
  user,
  updatedBy,
  transaction,
}: {
  userId: number;
  user: UserPartialAttributes;
  updatedBy?: number | null;
  transaction?: Transaction;
}) => {
  const { id, ...data } = user;

  return await _DataBase.instance.user.update(
    {
      ...data,
      updated_date: new Date(),
      updated_by: updatedBy,
    },
    {
      where: {
        id: userId,
      },
      transaction,
    }
  );
};

// export const updateUserById = async ({
//   userId,
//   updateUserDto,
//   updatedBy,
//   transaction,
// }: {
//   userId: number;
//   updateUserDto: UpdateUserDto;
//   updatedBy?: number | null;
//   transaction?: Transaction;
// }) => {
//   const { ...data } = updateUserDto;
//   try {
//     let userUpdate = await basicUpdateUserById({
//       user: data,
//       userId,
//       updatedBy,
//       transaction,
//     });

//     // if (roles) {
//     //   const { add, remove } = roles;

//       // Si hay para remover
//       // if (remove && remove.length > 0) {
//       //   await destroyUserRole({
//       //     userId,
//       //     roleIds: remove,
//       //     transaction,
//       //   });
//       // }

//       // // Si se desea incorporar nuevos
//       // if (add && add.length > 0) {
//       //   await setRolesForUser({ userId, roleIds: add, transaction });
//       // }
//     }

//     return userUpdate;
//   } catch (error) {
//     throw error;
//   }
// };
