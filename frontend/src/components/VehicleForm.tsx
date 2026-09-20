import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  vehicleSchema,
  type VehicleFormData,
  type VehicleFormInput,
} from "../schemas/vehicleSchema";
import type { Dealer } from "../types/dealer";
import {
  fuelTypes,
  type Vehicle,
} from "../types/vehicle";

interface VehicleFormProps {
  dealers: Dealer[];
  onSubmit: (data: VehicleFormData) => void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  vehicleToEdit?: Vehicle | null;
  onCancelEdit?: () => void;
}

const emptyVehicle = {
  brand: "",
  model: "",
  fuelType: "FLEX" as const,
  color: "",
  year: null,
  chassis: null,
  price: null,
  externalColor: null,
  dealerId: null,
};

const fuelTypeLabels = {
  GASOLINA: "Gasolina",
  ETANOL: "Etanol",
  FLEX: "Flex",
  DIESEL: "Diesel",
  ELETRICO: "Elétrico",
  HIBRIDO: "Híbrido",
};

export function VehicleForm({
  dealers,
  onSubmit,
  isSubmitting = false,
  isSuccess = false,
  vehicleToEdit = null,
  onCancelEdit,
}: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormInput, undefined, VehicleFormData >({
    resolver: zodResolver(vehicleSchema),
    defaultValues: emptyVehicle,
  });

  useEffect(() => {
    if (vehicleToEdit) {
      reset({
        brand: vehicleToEdit.brand,
        model: vehicleToEdit.model,
        fuelType: vehicleToEdit.fuelType,
        color: vehicleToEdit.color,
        year: vehicleToEdit.year,
        chassis: vehicleToEdit.chassis,
        price: vehicleToEdit.price,
        externalColor: vehicleToEdit.externalColor,
        dealerId: vehicleToEdit.dealer?.id ?? null,
      });
    } else {
      reset(emptyVehicle);
    }
  }, [vehicleToEdit, reset]);

  useEffect(() => {
    if (isSuccess && !vehicleToEdit) {
      reset(emptyVehicle);
    }
  }, [isSuccess, vehicleToEdit, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="brand">Marca</label>
        <input id="brand" {...register("brand")} />
        {errors.brand && <span>{errors.brand.message}</span>}
      </div>

      <div>
        <label htmlFor="model">Modelo</label>
        <input id="model" {...register("model")} />
        {errors.model && <span>{errors.model.message}</span>}
      </div>

      <div>
        <label htmlFor="fuelType">Tipo de combustível</label>
        <select id="fuelType" {...register("fuelType")}>
          {fuelTypes.map((fuelType) => (
            <option key={fuelType} value={fuelType}>
              {fuelTypeLabels[fuelType]}
            </option>
          ))}
        </select>
        {errors.fuelType && (
          <span>{errors.fuelType.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="color">Cor</label>
        <input id="color" {...register("color")} />
        {errors.color && <span>{errors.color.message}</span>}
      </div>

      <div>
        <label htmlFor="year">Ano</label>
        <input
          id="year"
          type="number"
          min={1886}
          max={2100}
          {...register("year")}
        />
        {errors.year && <span>{errors.year.message}</span>}
      </div>

      <div>
        <label htmlFor="chassis">Chassi</label>
        <input
          id="chassis"
          maxLength={17}
          {...register("chassis")}
        />
        {errors.chassis && <span>{errors.chassis.message}</span>}
      </div>

      <div>
        <label htmlFor="price">Valor</label>
        <input
          id="price"
          type="number"
          min="0.01"
          step="0.01"
          {...register("price")}
        />
        {errors.price && <span>{errors.price.message}</span>}
      </div>

      <div>
        <label htmlFor="externalColor">Cor externa</label>
        <input
          id="externalColor"
          {...register("externalColor")}
        />
        {errors.externalColor && (
          <span>{errors.externalColor.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="dealerId">Concessionária</label>
        <select id="dealerId" {...register("dealerId")}>
          <option value="">Sem concessionária</option>

          {dealers.map((dealer) => (
            <option key={dealer.id} value={dealer.id}>
              {dealer.corporateName}
            </option>
          ))}
        </select>

        {errors.dealerId && (
          <span>{errors.dealerId.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Salvando..."
          : vehicleToEdit
            ? "Salvar alterações"
            : "Cadastrar veículo"}
      </button>

      {vehicleToEdit && (
        <button
          type="button"
          onClick={onCancelEdit}
          disabled={isSubmitting}
        >
          Cancelar edição
        </button>
      )}
    </form>
  );
}
