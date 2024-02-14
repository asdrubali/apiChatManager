import { Router } from "express";
import {

  signInController,
  signOutController,

} from "../controllers/auth.controller";
import {
  recoveryUserAccountValidator,
  sendCodeForRecoveryValidator,
  signInValidator,
  verifyRecoveryCodeValidator,
} from "../validators/auth.validator";
import { allValidator } from "src/helpers/handleValidator";

// import {
//   findSupplierByCodeController,
//   supplierUpdateByCodeController,
// } from "../../supplier/controllers/supplier.controllers";
// import { uploadMultipleFiles } from "../../attachments/middleware/multer.middleware";

export const unprotectedRouter: Router = Router();
export const protectedRouter: Router = Router();

// Iniciar sesión
unprotectedRouter.post(
  "/signin",
  // signInValidator,
  // allValidator,
  signInController
);

protectedRouter.post("/signout", signOutController);

// Recuperar cuenta/password
// unprotectedRouter.post(
//   "/recovery/send-code",
//   sendCodeForRecoveryValidator,
//   allValidator,
//   sendCodeForRecoveryPasswordController
// );

// unprotectedRouter.post(
//   "/recovery/verify-code",
//   verifyRecoveryCodeValidator,
//   allValidator,
//   verifyRecoveryCodeController
// );
// unprotectedRouter.post(
//   "/recovery/user-account",
//   recoveryUserAccountValidator,
//   allValidator,
//   recoveryUserAccountController
// );
// unprotectedRouter.get(
//   "/supplier/find/code/:code_identification",
//   findSupplierByCodeController
// );
// unprotectedRouter.put(
//   "/supplier/update/code/:code_identification",
//   uploadMultipleFiles("file"),
//   supplierUpdateByCodeController
// );
