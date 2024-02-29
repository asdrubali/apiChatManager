import { NextFunction, Request, Response } from "express";


import { successResponse } from "src/api/functions/apiResponses";

import { errorControl } from "src/api/functions/errorControl";
import { IToken } from "src/api/interfaces/IToken.interface";
import { createContactService } from "../service/create/create.service";

export const createContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user as IToken;

    const dataBody = req.body

    const result = await createContactService({dataBody, createBy: 1})

    
    res
      .status(200)
      .json(successResponse(result, 200, "Contact creado con Exito"));
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const getListCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryParams = req.query;
    const page = Number(queryParams.page) || undefined;
    const limit = Number(queryParams.limit) || undefined;
    const search = (queryParams.search as string) || "";



    // res.status(200).json(successResponse(resp, 200, message));
  } catch (err: any) {
    errorControl(err, next);
  }
};
