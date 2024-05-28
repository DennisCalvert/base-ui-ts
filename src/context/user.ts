import { createContext } from "react";
import { UserType, UserWithTokenType } from "types/User";

export const blankUser = {
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
