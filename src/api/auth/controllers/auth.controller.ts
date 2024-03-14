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
