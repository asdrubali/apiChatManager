import { Router } from "express";

import { allValidator } from "src/helpers/handleValidator";
import { createMessageController } from "../controller/message.controller";


export const messageRouter: Router = Router();

messageRouter.post(
  "/create",
  // createCompanyValidator,
  // verifyAccess,
  // allValidator,
  createMessageController
);

// messageRouter.get(
//   "/list",
//   // verifyAccess,
//   allValidator,
//   getListPartnerController
// );

// messageRouter.get(
//   "/find/:id",
//   IdValidator,
//   // verifyAccess,
//   allValidator,
//   findByIdPartnerController
// );

// messageRouter.put(
//   "/update/:id",
//   updateCompanyValidator,
//   verifyAccess,
//   allValidator,
//   updateByIdCompanyController
// );



// messageRouter.delete(
//   "/delete/:id",
//   IdValidator,
//   verifyAccess,
//   allValidator,
//   deleteByIdCompanyController
// );
