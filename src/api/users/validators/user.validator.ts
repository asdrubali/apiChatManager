import { body, param } from "express-validator";
import { custom } from "joi";
import moment from "moment";
import { DataBase } from "../../../../database";

const paramUserId = param("id")
  .not()
  .isEmpty()
  .withMessage("El id del usuario es obligatorio")
  .bail()
  .isInt({ min: 1 })
  .withMessage("El id debe ser un número entero mayor a cero")
  .bail();

export const createUserDtoValidator = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("El nombre no puede estar vacío")
    .bail()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .bail(),

  body("paternal_lastname")
    .not()
    .isEmpty()
    .withMessage("El apellido paterno no puede estar vacío")
    .bail()
    .isString()
    .withMessage("El apellido paterno debe ser una cadena de texto")
    .bail(),

  body("email")
    .not()
    .isEmpty()
    .withMessage("El email no puede ser vacío")
    .bail()
    .isEmail()
    .withMessage("Se requiere un email válido")
    .bail()
    .isString()
    .withMessage("El email debe ser una cadena de texto")
    .bail()
    .custom(async (value: string) => {
      const existsEmail = await DataBase.instance.user.findOne({
        where: {
          email: value,
        },
      });

      if (existsEmail) {
        throw new Error("El email ingresado ya existe");
      }
      return true;
    })
    .bail(),

  body("roles")
    .not()
    .isEmpty()
    .withMessage("Los roles son obligatorios")
    .bail()
    .isArray()
    .withMessage("Debe ser un arreglo")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Se requiere como mínimo un elemento")
    .bail()
    .custom((value: any[]) => {
      if (!value.every(Number.isInteger)) {
        throw new Error("Todos los elementos deben ser enteros");
      }
      if (new Set(value).size !== value.length) {
        throw new Error("Todos los números deben ser únicos");
      }
      return true;
    })
    .bail(),

  body("tenant")
    .not()
    .isEmpty()
    .withMessage("La Unidad de Negocio es obligatora")
    .bail()
    .isNumeric()
    .withMessage("El valor debe ser númerico")
    .custom((value) => value >= 0)
    .withMessage("El valor debe ser positivo")
    .bail(),
];

export const updateUserDtoValidator = [
  paramUserId,
  body("name")
    .optional({ values: "undefined" })
    .not()
    .isEmpty()
    .withMessage("El nombre no puede estar vacío")
    .bail()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .bail(),

  body("paternal_lastname")
    .optional({ values: "undefined" })
    .not()
    .isEmpty()
    .withMessage("El apellido paterno no puede estar vacío")
    .bail()
    .isString()
    .withMessage("El apellido paterno debe ser una cadena de texto")
    .bail(),

  body("email")
    .optional({ values: "undefined" })
    .not()
    .isEmpty()
    .withMessage("El email no puede ser vacío")
    .bail()
    .isEmail()
    .withMessage("Se requiere un email válido")
    .bail()
    .isString()
    .withMessage("El email debe ser una cadena de texto")
    .bail(),

  body("tenant")
    .not()
    .isEmpty()
    .withMessage("La Unidad de Negocio es obligatora")
    .bail()
    .isNumeric()
    .withMessage("El valor debe ser númerico")
    .custom((value) => value >= 0)
    .withMessage("El valor debe ser positivo")
    .bail(),

  body("roles")
    .not()
    .isEmpty()
    .withMessage("Los roles son obligatorios")
    .bail()
    .isArray()
    .withMessage("Debe ser un arreglo")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Se requiere como mínimo un elemento")
    .bail()
    .custom((value: any[]) => {
      if (!value.every(Number.isInteger)) {
        throw new Error("Todos los elementos deben ser enteros");
      }
      if (new Set(value).size !== value.length) {
        throw new Error("Todos los números deben ser únicos");
      }
      return true;
    })
    .bail(),
];

export const changePasswordValidator = [
  body("oldPassword")
    .not()
    .isEmpty()
    .withMessage("La contraseña anterior es requerida")
    .bail()
    .isString()
    .withMessage("La contraseña anterior debe ser una cadena de texto")
    .bail()
    .isLength({ min: 6 })
    .withMessage("La contraseña anterior debe tener como mínino 6 dígitos"),
  body("newPassword")
    .not()
    .isEmpty()
    .withMessage("La nueva contraseña es requerida")
    .bail()
    .isString()
    .withMessage("La nueva contraseña debe ser una cadena de texto")
    .bail()
    .isLength({ min: 6 })
    .withMessage("La nueva contraseña debe tener como mínino 6 dígitos")
    .bail()
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        throw new Error(
          "La nueva contraseña no puede ser igual a la contraseña anterior"
        );
      }
      return true;
    }),
];

export const IdValidator = [paramUserId];
