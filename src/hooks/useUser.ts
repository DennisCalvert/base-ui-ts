import { useState, useEffect, useCallback } from "react";
import { notification } from "antd";
import { login as loginService } from "../services/user";
import { useQuery } from "react-query";
import { UserType, UserWithTokenType } from "types/User";

// type LoginResponseType = Partial<UserType> & { token: string };

// type DateWithNewMember <T> = Partial<T>
// & { newMember: boolean }
export const UseUser = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserWithTokenType>();

  // useEffect(() => {
  //   const isSessionValid = !!window.sessionStorage.getItem("token");
  //   setAuthenticated(isSessionValid);
  // }, []);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    setAuthenticated(false);
  };

  const login = async (email: string, password: string | undefined) => {
    const data = await loginService(email, password);

    if (data && data.token) {
      window.sessionStorage.setItem("token", JSON.stringify(data.token));
      setAuthenticated(true);
      setUserData(data);
    }
    // setUserData(data);
    return data;
    // return { isLoading, isError, data };
  };

  return { isAuthenticated, logout, login, userData };
};
