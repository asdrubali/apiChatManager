import { Router } from "express";


import {
  IdValidator,
  changePasswordValidator,
  createUserDtoValidator,
  updateUserDtoValidator,
} from "../validators/user.validator";

import { paginationValidator } from "../../../validators/pagination.validator";
import { verifyAccess } from "src/middlewares/user-access";
import { allValidator } from "src/helpers/handleValidator";
import { 
  createUserController, 
  getUserAccountController, 
  listUserController
} from '../controllers/user.controller';


export const router: Router = Router();

router.get(
  "/user-account",
//  verifyAccess, 
 getUserAccountController);

router.post(
  "/create",
  // verifyAccess,
  // createUserDtoValidator,
  allValidator,
  createUserController
);

// router.put(
//   "/update/:id",
//   verifyAccess,
//   updateUserDtoValidator,
//   allValidator,
//   updateUserController
// );

// router.get(
//   "/find/:id",
//   verifyAccess,
//   IdValidator,
//   allValidator,
//   findUserInformationByIdController
// );

router.get("/list",listUserController);
// router.put(
//   "/disable/:id",
//   verifyAccess,
//   IdValidator,
//   allValidator,
//   disableEnabledUserForAdminController
// );

// router.patch(
//   "/change/password",
//   verifyAccess,
//   changePasswordValidator,
//   allValidator,
//   updateMyUserPasswordController
// );