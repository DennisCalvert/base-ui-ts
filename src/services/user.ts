import api from "./base-api";
import { UserType, UserWithTokenType } from "types/User";

const baseRoute = "/users";

export const login = async (
  email: string,
  password: string | undefined
): Promise<UserWithTokenType> => await api.post("/login", { email, password });

export const list = async (): Promise<any> => api.get(baseRoute);

export const get = async (id: string | undefined): Promise<any> =>
  api.get(`${baseRoute}/${id}`);

export const create = async (data: any) => await api.post("/signup", data);

export const destroy = async (id: string) =>
  await api.destroy(`${baseRoute}/${id}`);

export const update = async (data: UserType) =>
  await api.put(`${baseRoute}/${data.id}`, data);

export const uploadProfilePhoto = async (userId: string, file: any) =>
  await api.uploadFile(`${baseRoute}/profilePhoto/${userId}`, file);
