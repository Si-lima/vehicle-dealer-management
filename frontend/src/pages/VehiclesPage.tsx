import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { VehicleForm } from "../components/VehicleForm";
import type { VehicleFormData } from "../schemas/vehicleSchema";
import { listDealers } from "../services/dealerService";
import {
  createVehicle,
  listVehicles,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService";
import type { Vehicle } from "../types/vehicle";

export function VehiclesPage() {
  const queryClient = useQueryClient();
  const [dealerFilter, setDealerFilter] = useState("");
  const [vehicleToEdit, setVehicleToEdit] =
  useState<Vehicle | null>(null);

  const {
    data: dealers = [],
    isLoading: isLoadingDealers,
    isError: isDealersError,
  } = useQuery({
    queryKey: ["dealers"],
    queryFn: listDealers,
  });

  const {
    data: vehicles = [],
    isLoading: isLoadingVehicles,
    isError: isVehiclesError,
  } = useQuery({
    queryKey: ["vehicles", dealerFilter],
    queryFn: () =>
      listVehicles(
        dealerFilter ? Number(dealerFilter) : undefined,
      ),
  });

  const createMutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
    },
  });
 const updateMutation = useMutation({
   mutationFn: ({
     id,
     data,
  }: {
    id: number;
    data: VehicleFormData;
  }) => updateVehicle(id, data),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["vehicles"],
    });

    setVehicleToEdit(null);
  },
});

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
    },
  });

  function handleCreateVehicle(data: VehicleFormData) {
    if (vehicleToEdit) {
      updateMutation.mutate({
        id: vehicleToEdit.id,
        data,
      });

      return;
    }

    createMutation.mutate(data);
  }

  function handleDelete(vehicle: Vehicle) {
    const shouldDelete = window.confirm(
      `Deseja realmente excluir ${vehicle.brand} ${vehicle.model}?`,
    );

    if (!shouldDelete) {
      return;
    }

    deleteMutation.mutate(vehicle.id);
  }

  function handleEdit(vehicle: Vehicle) {
    createMutation.reset();
    updateMutation.reset();
    setVehicleToEdit(vehicle);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    updateMutation.reset();
    setVehicleToEdit(null);
  }

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  return (
    <section className="card">
      <h2>Veículos</h2>

      <h3>Cadastrar veículo</h3>

      {isLoadingDealers && (
        <p>Carregando concessionárias...</p>
      )}

      {isDealersError && (
        <p>
          Não foi possível carregar as concessionárias.
        </p>
      )}

      {!isLoadingDealers && !isDealersError && (
        <VehicleForm
            dealers={dealers}
            onSubmit={handleCreateVehicle}
            isSubmitting={isSubmitting}
            isSuccess={
              createMutation.isSuccess ||
              updateMutation.isSuccess
            }
            vehicleToEdit={vehicleToEdit}
            onCancelEdit={handleCancelEdit}
          />
      )}

      {createMutation.isSuccess && (
        <p>Veículo cadastrado com sucesso !</p>
      )}
          {createMutation.isError && (
        <p>Não foi possível cadastrar o veículo.</p>
      )}

      <h3>Veículos cadastrados</h3>

      <div>
        <label htmlFor="dealerFilter">
          Filtrar por concessionária
        </label>

        <select
          id="dealerFilter"
          value={dealerFilter}
          onChange={(event) =>
            setDealerFilter(event.target.value)
          }
        >
          <option value="">Todas as concessionárias</option>

          {dealers.map((dealer) => (
            <option key={dealer.id} value={dealer.id}>
              {dealer.corporateName}
            </option>
          ))}
        </select>
      </div>

      {isLoadingVehicles && <p>Carregando veículos...</p>}

      {isVehiclesError && (
        <p>Não foi possível carregar os veículos.</p>
      )}

      {!isLoadingVehicles &&
        !isVehiclesError &&
        vehicles.length === 0 && (
          <p>Nenhum veículo cadastrado.</p>
        )}

      {!isLoadingVehicles &&
        !isVehiclesError &&
        vehicles.length > 0 && (
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <strong>
                  {vehicle.brand} {vehicle.model}
                </strong>
                <br />

                Combustível: {vehicle.fuelType}
                <br />

                Cor: {vehicle.color}
                <br />

                {vehicle.year !== null && (
                  <>
                    Ano: {vehicle.year}
                    <br />
                  </>
                )}

                {vehicle.chassis && (
                  <>
                    Chassi: {vehicle.chassis}
                    <br />
                  </>
                )}

                {vehicle.price !== null && (
                  <>
                    Valor: R${" "}
                    {vehicle.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <br />
                  </>
                )}

                {vehicle.externalColor && (
                  <>
                    Cor externa: {vehicle.externalColor}
                    <br />
                  </>
                )}

                Concessionária:{" "}
                {vehicle.dealer?.corporateName ??
                  "Não vinculada"}
                                <br />

                  <button
                    type="button"
                    onClick={() => handleEdit(vehicle)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(vehicle)}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending
                      ? "Excluindo..."
                      : "Excluir"}
                  </button>
</li>
            ))}
          </ul>
        )}
     </section>
   );
 } 
