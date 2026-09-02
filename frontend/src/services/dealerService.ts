import { api } from "../api/client";
import type { Dealer, DealerRequest } from "../types/dealer";

export async function listDealers(): Promise<Dealer[]> {
  const response = await api.get<Dealer[]>("/dealer");
  return response.data;
}

export async function getDealerById(id: number): Promise<Dealer> {
  const response = await api.get<Dealer>(`/dealer/${id}`);
  return response.data;
}

export async function createDealer(
  data: DealerRequest,
): Promise<Dealer> {
  const response = await api.post<Dealer>("/dealer", data);
  return response.data;
}

export async function updateDealer(
  id: number,
  data: DealerRequest,
): Promise<Dealer> {
  const response = await api.put<Dealer>(`/dealer/${id}`, data);
  return response.data;
}

export async function deleteDealer(id: number): Promise<void> {
  await api.delete(`/dealer/${id}`);
}
