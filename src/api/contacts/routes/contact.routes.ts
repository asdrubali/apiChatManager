import { Router } from "express";

import { allValidator } from "src/helpers/handleValidator";
import { createContactController } from "../controller/contact.controller";

export const contactRouter: Router = Router();

contactRouter.post(
  "/create",
    //   allValidator,
    createContactController
);

// contactRouter.get(
//   "/list",
//   // verifyAccess,
//   allValidator,
//   getListPartnerController
// );

// contactRouter.get(
//   "/find/:id",
//   IdValidator,
//   // verifyAccess,
//   allValidator,
//   findByIdPartnerController
// );

// contactRouter.put(
//   "/update/:id",
//   updateCompanyValidator,
//   verifyAccess,
//   allValidator,
//   updateByIdCompanyController
// );



// contactRouter.delete(
//   "/delete/:id",
//   IdValidator,
//   verifyAccess,
//   allValidator,
//   deleteByIdCompanyController
// );
