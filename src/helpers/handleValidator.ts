import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "src/api/functions/apiResponses";



export const allValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(errorResponse("Validación fallida", 400, errors.array()));
  }

  next();
};
