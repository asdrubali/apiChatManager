import { NextFunction, Request, Response } from "express";

import { IToken } from "src/api/interfaces/IToken.interface";

import { errorResponse, successResponse } from "src/api/functions/apiResponses";

import { errorControl } from "src/api/functions/errorControl";
import { createConversationService } from "../service/create/create.service";
import { getListConversationServices } from "../service/find/find.service";
import { deleteConversationServices } from "../service/delete/delete.service";


export const createConversationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user as IToken;

    console.log(userId);
    

    const dataBody = req.body as any;

    const result = await createConversationService({
      dataBody: {
       ...dataBody
      },
      createBy: userId,
      // createBy: 1,
    });


    res
      .status(200)
      .json(successResponse(result.id, 200, "conversacion Creada con Exito"));
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const getListConversationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { userId } = req.user as IToken;

    const resp = await getListConversationServices( userId);

    
    let message = "Lista de conversaciones obtenidos correctamente";

    if (!resp) {
      message = "No se encontraron conversaciones";
    }

    res.status(200).json(successResponse(resp, 200, message));
  } catch (err: any) {
    console.log(err);
    
    errorControl(err, next);
  }
};

export const deleteConversationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;

    const result = await deleteConversationServices(parseInt(id as string))


    res.status(200).json(successResponse("result", 200, 'conversacion eliminada correctamente'));
  } catch (err: any) {
    errorControl(err, next);
  }
};
