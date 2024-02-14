import { NextFunction, Request, Response } from "express";
import { SignInDto } from "../dtos/signInDto";
import { validateSignIn } from "../services/auth.service";



import { closeAllSessions } from "../../token/services/update/token.service";


import { basicUpdateUserById, findOneUser } from "../../users/services";

import { template_create_user } from "../../../templates/templates";

import { LoginStatus } from "../../users/constants/loginStatus";
import { UserPartialAttributes } from "../../users/models/user.model";
import { errorResponse, successResponse } from "src/api/functions/apiResponses";
import { createToken } from "src/api/token/services/create/token.service";
import { generateJWT } from "src/helpers/generate-jwt";
import { errorControl } from "src/api/functions/errorControl";
import { _DataBase } from "src/database";
import { IToken } from "src/api/interfaces/IToken.interface";


export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.body as SignInDto;

  try {
    const loginValidations = await validateSignIn(auth);
    

    if (!loginValidations.success) {
      return res
        .status(loginValidations.statusCode)
        .json(
          errorResponse(loginValidations.message, loginValidations.statusCode)
        );
    }

    if (!loginValidations.data) {
      return res
        .status(500)
        .json(
          errorResponse(
            "Sucedió un problema al verificar la existencia del usuario",
            500
          )
        );
    }

    const user = loginValidations.data;

    // Se cierran las sesiones abiertas
    await closeAllSessions({ user_id: user.id });

    // Se genera el token en BD
    const token = await createToken({ user_id: user.id });


    // Se genera el JWT
    const payload = {
      _key: token.uuid,
      _userId: user.id,
    };

    const jwt = await generateJWT(payload);

    return res
      .status(200)
      .json(successResponse(jwt, 200, "Sesión iniciada correctamente"));
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const signOutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { userId } = req.user as IToken;

    const finish = await closeAllSessions({
      user_id: 1,
    });

    return res
      .status(200)
      .json(successResponse(finish, 200, "Sesión finalizada correctamente"));
  } catch (error) {
    errorControl(error, next);
  }
};

// export const sendCodeForRecoveryPasswordController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email } = req.body;

//     const user = await findOneUser({
//       where: {
//         email,
//       },
//     });

//     if (!user) {
//       return res
//         .status(404)
//         .json(errorResponse("Error al solicitar código de recuperación", 400));
//     }

//     const fullName =
//       user.name + " " + user.paternal_lastname + " " + user.maternal_lastname;
//     const code = getRandomInt(1001, 9999).toString();

//     // Se establece el código
//     const resp = await basicUpdateUserById({
//       userId: user.id,
//       user: {
//         recovery_code: code,
//       },
//     });

//     // Se envía el correo
//     await sendMailAxios({
//       template: template_create_user({
//         names: fullName,
//         code,
//         banner:
//           "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//       }),
//       title: `[SPDA] Código de verificación`,
//       to: email!,
//     });

//     return res
//       .status(200)
//       .json(successResponse(email, 200, "¡Código enviado a tu correo!"));
//   } catch (error) {
//     errorControl(error, next);
//   }
// };

// export const verifyRecoveryCodeController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, verificationCode } = req.body;

//     const user = await findOneUser({
//       where: {
//         email,
//       },
//     });

//     if (!user) {
//       return res
//         .status(404)
//         .json(
//           errorResponse(
//             "Sucedió un error al intentar validar la información",
//             404
//           )
//         );
//     }

//     if (user.recovery_code != verificationCode) {
//       return res
//         .status(400)
//         .json(
//           errorResponse(
//             "El código proporcionado no coincide con el enviado",
//             404
//           )
//         );
//     }

//     return res
//       .status(200)
//       .json(
//         successResponse(
//           { email, verificationCode },
//           200,
//           "Código validado correctamente"
//         )
//       );
//   } catch (error) {
//     errorControl(error, next);
//   }
// };

// export const recoveryUserAccountController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password: newPassword, verificationCode } = req.body;
//     const user = await findOneUser({
//       where: {
//         email,
//       },
//     });

//     if (!user) {
//       return res
//         .status(404)
//         .json(
//           errorResponse(
//             "Sucedió un error al intentar validar la información",
//             404
//           )
//         );
//     }

//     const encryptedData = await encrypt(newPassword);

//     // Se vuelve a validar
//     if (user.recovery_code != verificationCode) {
//       return res
//         .status(400)
//         .json(
//           errorResponse(
//             "El código proporcionado no coincide con el enviado",
//             400
//           )
//         );
//     }

//     const isSamePassword = await verify(newPassword, user.salt, user.password);

//     if (isSamePassword) {
//       return res
//         .status(400)
//         .json(
//           errorResponse("No es posible registrar la misma contraseña", 400)
//         );
//     }

//     let message;
//     let resp;
//     if (user.login_status == LoginStatus.BI) {
//       const dataForRecover: UserPartialAttributes = {
//         password: encryptedData.hash,
//         salt: encryptedData.salt,
//         last_unlock_date: new Date(),
//         status: true,
//         login_status: LoginStatus.H,
//         failed_attempts: 0,
//         lockout_minutes: null,
//         last_lock_date: null,
//         recovery_code: null,
//       };

//       resp = await basicUpdateUserById({
//         user: dataForRecover,
//         userId: user.id,
//       });

//       message = "Cuenta restaurada correctamente";
//     } else {
//       const dataForUpdate: UserPartialAttributes = {
//         password: encryptedData.hash,
//         salt: encryptedData.salt,
//       };

//       resp = await basicUpdateUserById({
//         user: dataForUpdate,
//         userId: user.id,
//       });

//       message = "Contraseña actualizada correctamente";
//     }

//     res.status(200).json(successResponse(resp, 200, message));
//   } catch (err: any) {
//     errorControl(err, next);
//   }
// };
