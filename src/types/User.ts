// import { iInventory } from "views/Inventory/types";

export type UserType = {
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  name: string;
  id: string;
  _id: string;
  password?: string;
  imgUrl: string;
  isAccountVerified: boolean;
};

export type UserWithTokenType = Partial<UserType> & { token: string };
