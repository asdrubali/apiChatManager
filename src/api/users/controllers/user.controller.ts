import { NextFunction, Request, Response } from "express";

import {
  findOneUser,
  findUserById,
  findUserInformationById,
  getAccountById,
  getUsersList,
} from "../services/find/user.service";
import {
  updateUserById,
  // updateUserById,
  updateUserPassword,
} from "../services/update/user.service";
import { createUserAndSendMailService } from "../services/create/user.service";
import sequelize from "sequelize";
import createError from "http-errors";


import { generate } from "generate-password";
import { disableOrEnableUserById } from "../services";



import { UserAttributes } from "../models/user.model";


import { _DataBase } from "src/database";
import { IToken } from "src/api/interfaces/IToken.interface";
import { errorResponse, successResponse } from "src/api/functions/apiResponses";
import { errorControl } from "src/api/functions/errorControl";
import { verify } from "crypto";

export const getUserAccountController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {

    const { userId } = req.user as IToken

    const userAccount = await findUserById({
      id: userId,
      attributes: [
        'id',
        'name',
        'last_name',
        'user_type',
        'username',
        'email'
      ],
    },
    );

    return res
      .status(200)
      .json(
        successResponse(
          userAccount,
          200,
          "Cuenta del usuario obtenida correctamente"
        )
      );
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { userId } = req.user as IToken;

    const dataUser = req.body

    const randomPassword = generate({
      length: 10,
      symbols: false,
      numbers: true,
      lowercase: true,
      uppercase: false,
    });

    const result = await createUserAndSendMailService({
      createUserDto: {
        name: dataUser.name,
        last_name: dataUser.last_name,
        user_type: dataUser.user_type,
        username: dataUser.username,
        email: dataUser.email,
        password: dataUser.password,
      },
      createdBy: 1,
    });

    res
      .status(200)
      .json(
        successResponse(
          result.id,
          200,
          "Usuario generado correctamente. Se envió un correo con sus credenciales de acceso"
        )
      );
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { userId } = req.user as IToken;
    const { id } = req.params;
    const dataUpdate = req.body 

    const transaction = await _DataBase.instance.sequelize.transaction();
    let isSuccess;
    try {
      await updateUserById({
        userId: +id,
        updateUserDto: dataUpdate,
        transaction,
        updatedBy: 1,
      });

      await transaction.commit();
      isSuccess = true;
    } catch (error) {
      isSuccess = false;
      await transaction.rollback();
    }

    if (!isSuccess) {
      return res
        .status(500)
        .json(
          errorResponse(
            "Sucedió un error inesperado al actualizar los datos del usuario. Consulte con su administrador",
            500
          )
        );
    }

    return res.status(200).json("Datos del usuario actualizados correctamente");
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const disableEnabledUserForAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { userId } = req.user as IToken;
    const { id } = req.params;

    const result = await disableOrEnableUserById({
      userId: +id,
      updatedBy: 1,
    });

    res
      .status(200)
      .json(successResponse(result, 200, "Usuario actualizado correctamente"));
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const listUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {


    const resp = await getUsersList();
    let message = "Lista de usuarios obtenidos correctamente";

    if (resp.length === 0) {
      message = "No se encontraron usuarios";
    }

    res.status(200).json(successResponse(resp, 200, message));
  } catch (err: any) {
    errorControl(err, next);
  }
};

// export const updateMyUserPasswordController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { userId } = req.user as IToken;

//     const user = await findOneUser({
//       where: {
//         id: userId,
//       },
//     });

//     if (!user) {
//       return res
//         .status(400)
//         .json(errorResponse("Usuario no encontrado o no disponible", 400));
//     }

//     const { oldPassword, newPassword } = req.body;
//     const isOldPassword = await verify(oldPassword, user.salt, user.password);

//     if (!isOldPassword) {
//       return res
//         .status(400)
//         .json(errorResponse("Contraseña inicial incorrecta", 400));
//     }

//     const updated = await updateUserPassword({
//       userId,
//       updatedBy: userId,
//       password: newPassword,
//     });

//     return res
//       .status(200)
//       .json(
//         successResponse(updated, 200, "Contraseña actualizada correctamente")
//       );
//   } catch (err: any) {
//     errorControl(err, next);
//   }
// };

// export const findUserInformationByIdController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.params.id;
//     const user = await findUserInformationById(Number(userId));

//     if (!user) {
//       return res
//         .status(404)
//         .json(errorResponse(`No se encontró usuario con el id ${userId}`, 404));
//     }

//     return res
//       .status(200)
//       .json(successResponse(user, 200, "Usuario obtenido correctamente"));
//   } catch (err: any) {
//     errorControl(err, next);
//   }
// };
