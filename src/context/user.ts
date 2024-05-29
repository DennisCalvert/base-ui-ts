import { createContext } from "react";
import { UserWithTokenType } from "types/User";

export const blankUser: UserWithTokenType = {
  name: "",
  email: "",
  isAdmin: false,
  isActive: false,
  id: "",
  _id: "",
  imgUrl: "",
  token: "",
};

export const UserContext = createContext<UserWithTokenType>(blankUser);
