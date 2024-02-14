import { Router } from "express";

import { allValidator } from "src/helpers/handleValidator";

import { 
  IdValidator  
} from "../validators/company.validator";

import { 
  createPartnerController, 
  findByIdPartnerController, 
  getListPartnerController
} from "../controller/partner.controller";


export const partnerRouter: Router = Router();

partnerRouter.post(
  "/create",
  // createCompanyValidator,
  // verifyAccess,
  allValidator,
  createPartnerController
);

partnerRouter.get(
  "/list",
  // verifyAccess,
  allValidator,
  getListPartnerController
);

partnerRouter.get(
  "/find/:id",
  IdValidator,
  // verifyAccess,
  allValidator,
  findByIdPartnerController
);

// partnerRouter.put(
//   "/update/:id",
//   updateCompanyValidator,
//   verifyAccess,
//   allValidator,
//   updateByIdCompanyController
// );



// partnerRouter.delete(
//   "/delete/:id",
//   IdValidator,
//   verifyAccess,
//   allValidator,
//   deleteByIdCompanyController
// );
