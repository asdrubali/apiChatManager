import { NextFunction, Request, Response } from "express";
import { successResponse } from "src/api/functions/apiResponses";
import { errorControl } from "src/api/functions/errorControl";
import { getListTemplatesService } from "../services/find/find.service";



export const getListTemplatesController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
  
      const resp = await getListTemplatesService();
      let message = "Lista de Plantillas obtenidos correctamente";
  
      if (!resp) {
        message = "No se encontraron Plantillas";
      }
  
      res.status(200).json(successResponse(resp, 200, message));
    } catch (err: any) {
      errorControl(err, next);
    }
  };