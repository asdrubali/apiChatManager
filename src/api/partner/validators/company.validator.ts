import { body, param } from "express-validator";

const paramUserId = param("id")
  .not()
  .isEmpty()
  .withMessage("El id del campo es obligatorio")
  .bail()
  .isInt({ min: 1 })
  .withMessage("El id debe ser un número entero mayor a cero")
  .bail();

export const createCompanyValidator = [
  body("ruc")
    .not()
    .isEmpty()
    .withMessage("El campo 'ruc' no puede estar vacío")
    .bail()
    .isString()
    .withMessage("El campo 'ruc' debe ser una cadena de texto")
    .isLength({ min: 11, max: 11 })
    .withMessage(
      "El campo 'ruc' debe tener exactamente 11 caracteres"
    )
    .bail(),

  body("business_name")
    .not()
    .isEmpty()
    .withMessage("El campo 'business_name' no puede estar vacío")
    .bail()
    .isString()
    .withMessage("El campo 'business_name' debe ser una cadena de texto")
    .bail(),

  body("description")
    .not()
    .isEmpty()
    .withMessage("El campo 'description' no puede estar vacío")
    .bail()
    .isString()
    .withMessage(
      "El campo 'description' debe ser una cadena de texto"
    )
    .bail(),
];

export const updateCompanyValidator = [
  paramUserId,
  body("ruc")
    .optional({ values: "undefined" })
    .not()
    .isEmpty()
    .withMessage("El campo 'ruc' no puede estar vacío")
    .bail()
    .isString()
    .withMessage("El campo 'ruc' debe ser una cadena de texto")
    .isLength({ min: 11, max: 11 })
    .withMessage(
      "El campo 'ruc' debe tener exactamente dos caracteres"
    )
    .bail(),

  body("business_name")
    .optional({ values: "undefined" })
    .not()
    .isEmpty()
    .withMessage("El campo 'business_name' no puede estar vacío")
    .bail()
    .isString()
    .withMessage("El campo 'business_name' debe ser una cadena de texto")
    .bail(),

  body("description")
    .optional({ values: "undefined" })
    .not()
    .isEmpty()
    .withMessage("El campo 'description' no puede estar vacío")
    .bail()
    .isString()
    .withMessage(
      "El campo 'description' debe ser una cadena de texto"
    )
    .bail(),
];

export const IdValidator = [paramUserId];
