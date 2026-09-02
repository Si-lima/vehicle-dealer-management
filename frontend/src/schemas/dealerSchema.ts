import { z } from "zod";

export const dealerSchema = z.object({
  corporateName: z
    .string()
    .min(1, "A razão social é obrigatória")
    .max(150, "A razão social deve ter no máximo 150 caracteres"),

  cnpj: z
    .string()
    .regex(/^\d{14}$/, "O CNPJ deve possuir exatamente 14 números"),

  cep: z
    .string()
    .regex(/^\d{8}$/, "O CEP deve possuir exatamente 8 números"),

  street: z
    .string()
    .min(1, "O logradouro é obrigatório")
    .max(150, "O logradouro deve ter no máximo 150 caracteres"),

  neighborhood: z
    .string()
    .min(1, "O bairro é obrigatório")
    .max(100, "O bairro deve ter no máximo 100 caracteres"),

  city: z
    .string()
    .min(1, "A cidade é obrigatória")
    .max(100, "A cidade deve ter no máximo 100 caracteres"),

  state: z
    .string()
    .regex(/^[A-Za-z]{2}$/, "O estado deve possuir exatamente 2 letras")
    .transform((value) => value.toUpperCase()),
});

export type DealerFormData = z.infer<typeof dealerSchema>;
