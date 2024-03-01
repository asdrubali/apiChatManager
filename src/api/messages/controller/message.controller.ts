import { NextFunction, Request, Response } from "express";

import { successResponse } from "src/api/functions/apiResponses";

import { errorControl } from "src/api/functions/errorControl";

import { IToken } from "src/api/interfaces/IToken.interface";
import { createMessageService } from '../service/create/create.service';
import { deleteMessageServices } from "../service/delete/delete.service";



export const createMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { userId } = req.user as IToken;

    const dataBody = req.body

    console.log({dataBody});
    

    const result = await createMessageService(dataBody)

  
    res
      .status(200)
      .json(successResponse(result, 200, "mensaje guardado"));
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const deleteMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;

    const result = await deleteMessageServices(parseInt(id as string))


    res.status(200).json(successResponse("result", 200, 'mensaje eliminado correctamente'));
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const findByIdCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  
    // res
    //   .status(httpStatus)
    //   .json(
    //     result
    //       ? successResponse(result, httpStatus, message)
    //       : errorResponse(message, httpStatus)
    //   );
  } catch (err: any) {
    errorControl(err, next);
  }
};
