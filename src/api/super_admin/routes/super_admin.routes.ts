import { Router } from "express";


import { allValidator } from "src/helpers/handleValidator";


import { 
  IdValidator,
  createCompanyValidator, 
  updateCompanyValidator
} from "../validators/company.validator";

import { 
  createUserController,
  findByIdUserController, 
  getListUserController 
} from "../controller/super_admin.controller";

export const superAdminRoutes: Router = Router();

superAdminRoutes.post(
  "/create",
  // createCompanyValidator,
  // verifyAccess,
  allValidator,
  createUserController
);

superAdminRoutes.get(
  "/list",
  // verifyAccess,
  allValidator,
  getListUserController
);

superAdminRoutes.get(
  "/find/:id",
  IdValidator,
  // verifyAccess,
  allValidator,
  findByIdUserController
);

// superAdminRoutes.put(
//   "/update/:id",
//   updateCompanyValidator,
//   // verifyAccess,
//   allValidator,
//   updateByIdCompanyController
// );



// superAdminRoutes.delete(
//   "/delete/:id",
//   IdValidator,
//   // verifyAccess,
//   allValidator,
//   deleteByIdCompanyController
// );
