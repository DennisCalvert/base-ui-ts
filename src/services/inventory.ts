import api from "./base-api";
import { iInventory } from "views/Inventory/types";

const baseRoute = "/inventory";

interface DTO {
  _id: string;
  data: iInventory[];
}

export const get = async (id: string): Promise<DTO> =>
  await api.get(`${baseRoute}/${id}`);

export const post = async (id: string, data: iInventory[]): Promise<string> =>
  await api.post(`${baseRoute}/${id}`, data);

export const destroy = async (id: string): Promise<void> =>
  api.destroy(`${baseRoute}/${id}`);
