import { createContext } from "react";
import { UserType } from "types/User";

export const blankUser = {
  name: "",
  email: "",
  isAdmin: false,
  isActive: false,
  id: "",
  _id: "",
  imgUrl: "",
};

export const UserContext = createContext<UserType>(blankUser);
