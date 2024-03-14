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
  allValidator,
  createPartnerController
);

partnerRouter.get(
  "/list",
  allValidator,
  getListPartnerController
);

partnerRouter.get(
  "/find/:id",
  IdValidator,
  allValidator,
  findByIdPartnerController
);


