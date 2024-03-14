import { Router } from "express";
import {

  signInController,
  signOutController,

} from "../controllers/auth.controller";


export const unprotectedRouter: Router = Router();
export const protectedRouter: Router = Router();


unprotectedRouter.post(
  "/signin",
  signInController
);

protectedRouter.post("/signout", signOutController);
