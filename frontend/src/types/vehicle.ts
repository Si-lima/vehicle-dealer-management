export const fuelTypes = [
  "GASOLINA",
  "ETANOL",
  "FLEX",
  "DIESEL",
  "ELETRICO",
  "HIBRIDO",
] as const;

export type FuelType = (typeof fuelTypes)[number];

export interface VehicleDealer {
  id: number;
  corporateName: string;
  cnpj: string;
}

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  fuelType: FuelType;
  color: string;
  year: number | null;
  chassis: string | null;
  price: number | null;
  externalColor: string | null;
  dealer: VehicleDealer | null;
}

export interface VehicleRequest {
  brand: string;
  model: string;
  fuelType: FuelType;
  color: string;
  year: number | null;
  chassis: string | null;
  price: number | null;
  externalColor: string | null;
  dealerId: number | null;
}
