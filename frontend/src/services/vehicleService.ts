import { api } from "../api/client";
import type {
  Vehicle,
  VehicleRequest,
} from "../types/vehicle";

export async function listVehicles(
  dealerId?: number,
): Promise<Vehicle[]> {
  const response = await api.get<Vehicle[]>("/vehicles", {
    params: dealerId ? { dealerId } : undefined,
  });

  return response.data;
}

export async function getVehicleById(
  id: number,
): Promise<Vehicle> {
  const response = await api.get<Vehicle>(`/vehicles/${id}`);
  return response.data;
}

export async function createVehicle(
  data: VehicleRequest,
): Promise<Vehicle> {
  const response = await api.post<Vehicle>("/vehicles", data);
  return response.data;
}

export async function updateVehicle(
  id: number,
  data: VehicleRequest,
): Promise<Vehicle> {
  const response = await api.put<Vehicle>(
    `/vehicles/${id}`,
    data,
  );

  return response.data;
}

export async function deleteVehicle(
  id: number,
): Promise<void> {
  await api.delete(`/vehicles/${id}`);
}
