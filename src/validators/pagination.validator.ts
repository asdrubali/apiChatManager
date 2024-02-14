import { query } from "express-validator";

export const paginationValidator = [
  query("page")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("La página debe ser un número entero positivo")
    .bail(),

  query("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("El límite debe ser un número entero positivo")
    .bail(),
];


