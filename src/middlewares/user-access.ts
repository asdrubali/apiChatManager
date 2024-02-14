import { NextFunction, Request, Response } from "express";
import { IToken } from "../api/interfaces/IToken.interface";
import { errorResponse } from "../api/functions/apiResponses";

function routeToRegExp(route: string) {
  // Si la ruta termina con '/', se remueve
  const cleanedRoute = route.endsWith("/") ? route.slice(0, -1) : route;

  return new RegExp("^" + cleanedRoute.split("*").join("[^/]+") + "$");
}

export function verifyAccess(req: Request, res: Response, next: NextFunction) {
  const user = req?.user as IToken;

  const originalRoute = req.originalUrl;
  let currentRoute = originalRoute.split("?")[0].replace("/api", "");

  // Se asegura que no exista un '/' al final
  currentRoute =
    currentRoute.endsWith("/") && currentRoute !== "/"
      ? currentRoute.slice(0, -1)
      : currentRoute;

  const currentMethod = req.method.toUpperCase();
  console.log({ originalRoute, currentRoute });

  const userAllowedRoutes = user?.allowedRoutes || [];

  // Verifica si la ruta y el método actual coinciden con alguna de las rutas y métodos permitidos
  const hasAccess = userAllowedRoutes.some((allowedRoute) => {
    const routeRegExp = routeToRegExp(allowedRoute.route);
    return (
      routeRegExp.test(currentRoute) &&
      allowedRoute.verb.trim().toUpperCase() === currentMethod
    );
  });

  if (!hasAccess) {
    return res
      .status(403)
      .json(
        errorResponse(
          "Usted no tiene permisos para realizar la siguiente operación",
          403
        )
      );
  }

  next();
}
