import { Router } from "express";

import { allValidator } from "src/helpers/handleValidator";
import { getListTemplatesController } from "../controllers/templates.controller";




export const partnerRouter: Router = Router();



partnerRouter.get(
  "/list",
  getListTemplatesController
);

