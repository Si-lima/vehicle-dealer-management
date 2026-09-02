export interface Dealer {
  id: number;
  corporateName: string;
  cnpj: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export type DealerRequest = Omit<Dealer, "id">;
