import { NextFunction, Request, Response } from "express";


import { IToken } from "src/api/interfaces/IToken.interface";

import { errorResponse, successResponse } from "src/api/functions/apiResponses";

import { errorControl } from "src/api/functions/errorControl";

import { 
  deletedByIdCompanyServices, 
  updateByIdCompanyService 
} from "../services/update/update_super_admin.service";

import { 
  createSuperAdminService, 
  getByIdUserServices,
  getListUsersServices
} from "../services/index.service";



export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { userId } = req.user as IToken;


    const dataBody = req.body as any;

    const result = await createSuperAdminService({
      createCompanyDto: {
        ...dataBody
      },
      // createBy: userId,
      createBy: 1,
    });


    res
      .status(200)
      .json(successResponse(result.id, 200, "Compania Creada con Exito"));
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const getListUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryParams = req.query;
    const page = Number(queryParams.page) || undefined;
    const limit = Number(queryParams.limit) || undefined;
    const search = (queryParams.search as string) || "";

    const resp = await getListUsersServices();

    let message = "Lista de Especialidades obtenidos correctamente";

    if (resp.length === 0) {
      message = "No se encontraron Especialidades";
    }

    res.status(200).json(successResponse(resp, 200, message));
  } catch (err: any) {
    errorControl(err, next);
  }
};

export const findByIdUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const result = await getByIdUserServices({
      userId: +userId,
    });

    const httpStatus = result ? 200 : 404;
    const message = result
      ? "Usuario obtenida correctamente"
      : `La Usuario con el ID: ${userId} no existe.`;

    res
      .status(httpStatus)
      .json(
        result
          ? successResponse(result, httpStatus, message)
          : errorResponse(message, httpStatus)
      );
  } catch (err: any) {
    errorControl(err, next);
  }
};

// export const updateByIdCompanyController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { userId } = req.user as IToken;
//     const company_id = req.params.id;

//     const {
//       ruc,
//       business_name,
//       description,
//     } = req.body as UpdateCompanyDto;

//     const result = await updateByIdCompanyService({
//       company_id: +company_id,
//       updateDto: {
//         ruc,
//         business_name,
//         description,
//       },
//       userId: userId,
//     });

//     const httpStatus = result ? 200 : 404;
//     const message = result
//       ? "Compania actualizada correctamente"
//       : `La Compania con el ID: ${company_id} no existe.`;

//     res
//       .status(httpStatus)
//       .json(
//         result
//           ? successResponse(result, httpStatus, message)
//           : errorResponse(message, httpStatus)
//       );
//   } catch (err: any) {
//     errorControl(err, next);
//   }
// };


// export const deleteByIdCompanyController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // const { userId } = req.user as IToken;
//     const company_id = req.params.id;

//     const result = await 
//     deletedByIdCompanyServices({

//       company_id
//       : +company_id,
//       userId,
//     });

//     const httpStatus = result ? 200 : 404;
//     const message = result
//       ? "Modificación de estado de la Compania correctamente"
//       : `La Compania con el ID: ${company_id} no existe.`;

//     res
//       .status(httpStatus)
//       .json(
//         result
//           ? successResponse(result, httpStatus, message)
//           : errorResponse(message, httpStatus)
//       );
//   } catch (err: any) {
//     errorControl(err, next);
//   }
// };
