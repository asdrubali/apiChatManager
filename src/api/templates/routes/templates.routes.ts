import { Router } from "express";

import { allValidator } from "src/helpers/handleValidator";
import { getListTemplatesController } from "../controllers/templates.controller";




export const templatesRouter: Router = Router();



templatesRouter.get(
  "/list",
  getListTemplatesController
);

