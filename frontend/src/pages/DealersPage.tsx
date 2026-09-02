import { useQuery } from "@tanstack/react-query";
import { listDealers } from "../services/dealerService";

export function DealersPage() {
  const {
    data: dealers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dealers"],
    queryFn: listDealers,
  });

  if (isLoading) {
    return <p>Carregando concessionárias...</p>;
  }

  if (isError) {
    return <p>Não foi possível carregar as concessionárias.</p>;
  }

  return (
    <section>
      <h2>Concessionárias</h2>

      {dealers.length === 0 ? (
        <p>Nenhuma concessionária cadastrada.</p>
      ) : (
        <ul>
          {dealers.map((dealer) => (
            <li key={dealer.id}>
              <strong>{dealer.corporateName}</strong>
              <br />
              CNPJ: {dealer.cnpj}
              <br />
              Localização: {dealer.city}/{dealer.state}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
