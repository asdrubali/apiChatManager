import { Optional, Transaction } from "sequelize";
import {
  UserAttributes,
  UserCreationAttributes,
  UserModel,
} from "../../models/user.model";

import { USER_DEFAULT_VALUES } from "../../constants/defaultValues";
// import { template_create_admin } from "../../../../templates/templates";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { _DataBase } from "src/database";
import { encrypt } from "src/api/security/criptoService";

export const createUserAndSendMailService = async ({
  createUserDto,
  createdBy,
}: {
  createUserDto: any;
  createdBy: number;
}) => {
  const transaction = await _DataBase.instance.sequelize.transaction();
  try {
    const { password, salt, ...user_details }: UserAttributes =
      await createUser({
        createUserDto,
        createdBy,
        transaction,
      });


    await transaction.commit();

    // await sendMailAxios({
    //   title:
    //     "Hola " +
    //     user_details.name +
    //     ", tu nueva contraseña es:  " +
    //     createUserDto.password,
    //   to: user_details.email!,
    //   template: template_create_admin({
    //     names: user_details.name + " " + user_details.paternal_lastname,
    //     redirect_buttom: config.PROY_FEURL + "/api/signin",
    //     logo: company_logo,
    //     company_name,
    //     p_color: company_p,
    //     s_color: company_s,
    //   }),
    // });

    return user_details;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const createUser = async ({
  createUserDto,
  createdBy,
  transaction,
}: {
  createUserDto: any;
  createdBy?: number;
  transaction?: Transaction;
}) => {
  const basicData =
    createUserDto;

  try {
    const { hash: encryptedPassword, salt } = await encrypt(basicData.password);

    const user: Optional<
      UserAttributes,
      NullishPropertiesOf<UserAttributes>
    > = {
      ...basicData,
      password: encryptedPassword,
      salt,
      created_date: new Date(),
      created_by: createdBy,
      status: true,
      // notifications: notifications || false,
      login_status: USER_DEFAULT_VALUES.LOGIN_STATUS,
      failed_attempts: USER_DEFAULT_VALUES.FAILED_ATTEMPTS,
      is_deleted: false,
    };

    let newUser = (
      await _DataBase.instance.user.create(user, {
        transaction,
      })
    ).toJSON();

    // if (roles && roles.length > 0) {
    //   await setRolesForUser({
    //     userId: newUser.id,
    //     roleIds: roles,
    //     transaction,
    //   });
    // }

    return newUser;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};

export { createUser };
