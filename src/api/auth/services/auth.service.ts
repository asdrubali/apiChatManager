import moment from "moment";

import { LoginStatus } from "../../users/constants/loginStatus";
import {
  UserAttributes,
  UserPartialAttributes,
} from "../../users/models/user.model";
import { findOneUser } from "../../users/services/find/user.service";
import { SignInDto } from "../dtos/signInDto";
import { BasicSignInResponse } from "../interfaces/auth.interfaces";
import { USER_BLOCK_POLICY } from "../../users/constants/userBlockPolicy";
import { basicUpdateUserById } from "../../users/services/update/user.service";
import { _DataBase } from "src/database";
import { verify } from "src/api/security/criptoService";


export const validateSignIn = async (
  auth: SignInDto
): Promise<BasicSignInResponse<UserAttributes | null>> => {
  const { email, password, device_id } = auth;

  const resp: BasicSignInResponse<UserAttributes | null> = {
    statusCode: 500,
    message: "Sucedió un error inesperado consulte con su administrador",
    success: false,
    data: null,
  };

  try {
    // Se busca al usuario por el correo
    const user = await findOneUser({
      where: {
        email,
      },
    });

    if (!user) {
      resp.message = "Usuario desactivado o no existe";
      resp.statusCode = 404;
      return resp;
    }

    const {
      id,
      status,
      login_status,
      failed_attempts,
      last_lock_date,
      lockout_minutes,
    } = user;

    // Se verifica el estado
    if (!status) {
      resp.statusCode = 401;
      resp.message = "Usuario desactivado o no existe";
      return resp;
    }

    // Se verifica el estado de logueo
    if (login_status === LoginStatus.BI) {
      resp.statusCode = 401;
      resp.message =
        "El usuario está bloqueado, ve a la sección de reestablecer cuenta o cambia de contraseña";
      return resp;
    }

    // Se verifica si las siguientes propiedades estan correctamente implementadas
    if (
      login_status === LoginStatus.BIT &&
      !(last_lock_date && lockout_minutes)
    ) {
      resp.statusCode = 500;
      return resp;
    }

    // Se verifica si está bloqueado temporalmente y si sus intentos son iguales o superiores al maximo establecido
    if (
      login_status === LoginStatus.BIT &&
      failed_attempts >= USER_BLOCK_POLICY.MAX_ATTEMPTS
    ) {
      const momentNow = moment().utc();
      const momentFinishLockDate = moment(last_lock_date).add(
        lockout_minutes,
        "minutes"
      );

      if (momentFinishLockDate.isSameOrAfter(momentNow)) {
        const millisecondsDifference = momentFinishLockDate.diff(momentNow);
        let message = generateTimeMessage(millisecondsDifference);

        resp.statusCode = 401;
        resp.message = message;
        return resp;
      }
    }

    // Se prepara el objeto para desbloquear
    const unlock: UserPartialAttributes = {
      login_status: LoginStatus.H,
      failed_attempts: 0,
      last_lock_date: null,
      last_unlock_date: new Date(),
      lockout_minutes: null,
    };

    const isValidPassword = await verify(password, user.salt, user.password);

    // Si la contraseña es incorrecta, se aumenta los intentos
    if (!isValidPassword) {
      let messagePassword = "Correo electrónico o contraseña incorrectos";
      let statusCode = 400;

      let newFailedAttempts = failed_attempts + 1;

      const block: UserPartialAttributes = {
        failed_attempts: newFailedAttempts,
      };

      // if (newFailedAttempts === USER_BLOCK_POLICY.MAX_ATTEMPTS) {
      //   messagePassword = "No tiene permisos, por favor ingrese nuevamente";

      //   // Se bloquea temporalmente
      //   block.last_lock_date = new Date();
      //   block.lockout_minutes = USER_BLOCK_POLICY.MIN_BLOCKED_MINUTES;
      //   block.login_status = LoginStatus.BIT;
      // }

      await basicUpdateUserById({ userId: user.id, user: block });

      resp.message = messagePassword;
      resp.statusCode = statusCode;
      return resp;
    }

    if (isValidPassword && failed_attempts > 0) {
      // Se desbloquea
      await basicUpdateUserById({
        userId: user.id,
        user: unlock,
        updatedBy: null,
      });
    }

    resp.data = { ...user };
    resp.statusCode = 200;
    resp.message = "Autenticación válida";
    resp.success = true;

    return resp;
  } catch (error) {
    throw error;
  }
};

const generateTimeMessage = (millisecondsDifference: number): string => {
  const duration = moment.duration(millisecondsDifference);
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let message = "Inténtelo nuevamente en ";

  if (minutes === 0 && seconds === 0) {
    message += "un segundo";
  } else if (minutes === 0) {
    if (seconds === 1) {
      message += "un segundo";
    } else {
      message += `${seconds} segundos`;
    }
  } else {
    if (minutes === 1) {
      message += "un minuto";
    } else {
      message += `${minutes} minutos`;
    }

    if (seconds > 0) {
      if (seconds === 1) {
        message += " y un segundo";
      } else {
        message += ` y ${seconds} segundos`;
      }
    }
  }

  return message;
};
