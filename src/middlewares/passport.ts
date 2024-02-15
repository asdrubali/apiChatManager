import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import moment from "moment";
import { IToken } from "../api/interfaces/IToken.interface";
import { TokenAttributes } from "src/api/token/models/token.model";
import { findOneToken } from "src/api/token/services/find/token.service";
import { updateLastRequest } from "src/api/token/services/update/token.service";
import { _DataBase } from "src/database";
import { ROLES } from "src/api/roles/constants/roles.constants";
import { Request } from 'express'; // Importa la interfaz Request desde express

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "BpvnW%H4e&iBMV",
};

export type CustomPassportErrorReason =
  | "TokenNotFound"
  | "TokenExpired"
  | "UserNotFound"
  | "RolesNotFound"
  | "InternalError";

export interface CustomPassportError {
  message: string;
  reason: CustomPassportErrorReason;
  source: "Passport";
}

// Usa el tipo Request de express en lugar de 'any'
export default new Strategy(opts, async (payload: any, done) => {
  const customError: CustomPassportError = {
    message: "Error desconocido. Consulte con su administrador",
    reason: "InternalError",
    source: "Passport",
  };

  try {

    console.log(payload);
    
    console.log('entro');
    
    
    const token: TokenAttributes | null = await findOneToken({
      where: {
        uuid: payload._key,
      },
    });

    if (!token) {
      customError.reason = "TokenNotFound";
      customError.message = "Token no encontrado";
      return done(customError, false);
    }

    const momentNow = moment().utc();
    const momentExpiresAt = moment(token.expires_at);

    if (momentNow.isAfter(momentExpiresAt) || token.status == false) {
      customError.reason = "TokenExpired";
      customError.message = "Sesión expirada";
      return done(customError, false);
    }

    const currentUser = await _DataBase.instance.user.findByPk(token.user_id);

    if (!currentUser) {
      customError.reason = "UserNotFound";
      customError.message = "Usuario no existe";
      return done(customError, false);
    }

    // if (![ROLES.ADMIN, ROLES.PARTNER, ROLES.COMPANY, ROLES.AGENT].includes(currentUser.user_type)) {
    //   customError.reason = "RolesNotFound";
    //   customError.message = "Rol no definido o no existe";
    //   return done(customError, false);
    // }

    await updateLastRequest({ uuid: payload._key });

    const user: IToken = {
      userId: Number(token.user_id),
      user_type: currentUser.user_type,
    };

    console.log(user);
    

    // Agrega el objeto user al req.user para que esté disponible en las solicitudes
    done(null, user);
  } catch (error) {
    console.log(error);
    return done(customError, false);
  }
});
