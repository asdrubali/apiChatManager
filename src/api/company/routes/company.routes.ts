// import { Router } from "express";

// import { 
//   createCompanyController, 
//   deleteByIdCompanyController, 
//   findByIdCompanyController, 
//   getListCompanyController, 
//   updateByIdCompanyController 
// } from "../controller/company.controller";

// // import { allValidator } from "../../../../middlewares/error-validator";


// import { 
//   IdValidator,
//   createCompanyValidator, 
//   updateCompanyValidator
// } from "../validators/company.validator";
// import { allValidator } from "src/api/helpers/handleValidator";

// export const CompanyRoutes: Router = Router();

// CompanyRoutes.post(
//   "/create",
//   createCompanyValidator,
//   // verifyAccess,
//   allValidator,
//   createCompanyController
// );

// CompanyRoutes.get(
//   "/list",
//   // verifyAccess,
//   allValidator,
//   getListCompanyController
// );

// CompanyRoutes.get(
//   "/find/:id",
//   IdValidator,
//   // verifyAccess,
//   allValidator,
//   findByIdCompanyController
// );

// CompanyRoutes.put(
//   "/update/:id",
//   updateCompanyValidator,
//   // verifyAccess,
//   allValidator,
//   updateByIdCompanyController
// );



// CompanyRoutes.delete(
//   "/delete/:id",
//   IdValidator,
//   // verifyAccess,
//   allValidator,
//   deleteByIdCompanyController
// );
