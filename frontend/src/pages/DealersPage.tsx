import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { DealerForm } from "../components/DealerForm";
import type { DealerFormData } from "../schemas/dealerSchema";
import {
  createDealer,
  listDealers,
  updateDealer,
} from "../services/dealerService";
import type { Dealer } from "../types/dealer";

export function DealersPage() {
  const queryClient = useQueryClient();
  const [dealerToEdit, setDealerToEdit] = useState<Dealer | null>(null);

  const {
    data: dealers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dealers"],
    queryFn: listDealers,
  });

  const createMutation = useMutation({
    mutationFn: createDealer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dealers"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: DealerFormData;
    }) => updateDealer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dealers"],
      });
      setDealerToEdit(null);
    },
  });

  function handleSubmitDealer(data: DealerFormData) {
    if (dealerToEdit) {
      updateMutation.mutate({
        id: dealerToEdit.id,
        data,
      });
      return;
    }

    createMutation.mutate(data);
  }

  function handleEdit(dealer: Dealer) {
    createMutation.reset();
    updateMutation.reset();
    setDealerToEdit(dealer);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    updateMutation.reset();
    setDealerToEdit(null);
  }

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  return (
    <section className="card">
      <h2>Concessionárias</h2>

      <h3>
        {dealerToEdit
          ? "Editar concessionária"
          : "Cadastrar concessionária"}
      </h3>

      <DealerForm
        onSubmit={handleSubmitDealer}
        isSubmitting={isSubmitting}
        isSuccess={
          dealerToEdit
            ? updateMutation.isSuccess
            : createMutation.isSuccess
        }
        dealerToEdit={dealerToEdit}
        onCancelEdit={handleCancelEdit}
      />

      {createMutation.isSuccess && !dealerToEdit && (
        <p>Concessionária cadastrada com sucesso!</p>
      )}

      {createMutation.isError && (
        <p>Não foi possível cadastrar a concessionária.</p>
      )}

      {updateMutation.isSuccess && !dealerToEdit && (
        <p>Concessionária atualizada com sucesso!</p>
      )}

      {updateMutation.isError && (
        <p>Não foi possível atualizar a concessionária.</p>
      )}

      <h3>Concessionárias cadastradas</h3>

      {isLoading && <p>Carregando concessionárias...</p>}

      {isError && (
        <p>Não foi possível carregar as concessionárias.</p>
      )}

      {!isLoading && !isError && dealers.length === 0 && (
        <p>Nenhuma concessionária cadastrada.</p>
      )}

      {!isLoading && !isError && dealers.length > 0 && (
        <ul>
          {dealers.map((dealer) => (
            <li key={dealer.id}>
              <strong>{dealer.corporateName}</strong>
              <br />
              CNPJ: {dealer.cnpj}
              <br />
              CEP: {dealer.cep}
              <br />
              Endereço: {dealer.street}, {dealer.neighborhood}
              <br />
              Localização: {dealer.city}/{dealer.state}
              <br />
              <button
                type="button"
                onClick={() => handleEdit(dealer)}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
