import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DealerForm } from "../components/DealerForm";
import type { DealerFormData } from "../schemas/dealerSchema";
import {
  createDealer,
  listDealers,
} from "../services/dealerService";

export function DealersPage() {
  const queryClient = useQueryClient();

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

  function handleCreateDealer(data: DealerFormData) {
    createMutation.mutate(data);
  }

  return (
    <section className="card">
      <h2>Concessionárias</h2>

      <h3>Cadastrar concessionária</h3>

      <DealerForm
        onSubmit={handleCreateDealer}
        isSubmitting={createMutation.isPending}
      />

      {createMutation.isSuccess && (
        <p>Concessionária cadastrada com sucesso!</p>
      )}

      {createMutation.isError && (
        <p>Não foi possível cadastrar a concessionária.</p>
      )}

      <h3>Concessionárias cadastradas</h3>

      {isLoading && (
        <p>Carregando concessionárias...</p>
      )}

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
              Endereço: {dealer.street},{" "}
              {dealer.neighborhood}
              <br />
              Localização: {dealer.city}/{dealer.state}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
