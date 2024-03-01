import { Router } from "express";

import { allValidator } from "src/helpers/handleValidator";
import { createConversationController, deleteConversationController, getListConversationController } from "../controller/conversation.controller";


export const conversationRouter: Router = Router();

conversationRouter.post(
  "/create",
  // createCompanyValidator,
  // verifyAccess,
//   allValidator,
  createConversationController
);

conversationRouter.get(
  "/list",
  // verifyAccess,
  allValidator,
  getListConversationController
);

// conversationRouter.get(
//   "/find/:id",
//   IdValidator,
//   // verifyAccess,
//   allValidator,
//   findByIdPartnerController
// );

// conversationRouter.put(
//   "/update/:id",
//   updateCompanyValidator,
//   verifyAccess,
//   allValidator,
//   updateByIdCompanyController
// );



conversationRouter.delete(
  "/delete/:id",
  deleteConversationController
);
