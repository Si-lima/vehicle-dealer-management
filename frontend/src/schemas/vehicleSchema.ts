import { z } from "zod";
import { fuelTypes } from "../types/vehicle";

const optionalNumber = z.preprocess(
  (value) => {
    if (value === "" || value === undefined || value === null) {
      return null;
    }

    return Number(value);
  },
  z.number().nullable(),
);

const optionalText = z.preprocess(
  (value) => {
    if (typeof value !== "string" || value.trim() === "") {
      return null;
    }

    return value.trim().toUpperCase();
  },
  z.string().nullable(),
);

export const vehicleSchema = z.object({
  brand: z
    .string()
    .min(1, "A marca é obrigatória")
    .max(80, "A marca deve ter no máximo 80 caracteres"),

  model: z
    .string()
    .min(1, "O modelo é obrigatório")
    .max(100, "O modelo deve ter no máximo 100 caracteres"),

  fuelType: z.enum(fuelTypes, {
    message: "Selecione o tipo de combustível",
  }),

  color: z
    .string()
    .min(1, "A cor é obrigatória")
    .max(50, "A cor deve ter no máximo 50 caracteres"),

  year: optionalNumber.refine(
    (value) =>
      value === null ||
      (Number.isInteger(value) && value >= 1886 && value <= 2100),
    "O ano deve estar entre 1886 e 2100",
  ),

  chassis: optionalText.refine(
    (value) =>
      value === null || /^[A-HJ-NPR-Z0-9]{17}$/.test(value),
    "O chassi deve possuir 17 caracteres alfanuméricos válidos",
  ),

  price: optionalNumber.refine(
    (value) => value === null || value > 0,
    "O valor deve ser maior que zero",
  ),

  externalColor: z.preprocess(
    (value) => {
      if (typeof value !== "string" || value.trim() === "") {
        return null;
      }

      return value.trim();
    },
    z
      .string()
      .max(
        50,
        "A cor externa deve ter no máximo 50 caracteres",
      )
      .nullable(),
  ),

  dealerId: optionalNumber.refine(
    (value) =>
      value === null ||
      (Number.isInteger(value) && value > 0),
    "Selecione uma concessionária válida",
  ),
});

export type VehicleFormInput = z.input<typeof vehicleSchema>;
export type VehicleFormData = z.output<typeof vehicleSchema>;

