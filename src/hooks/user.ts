import { useState, useEffect, useCallback } from "react";
import { notification } from "antd";
import { login as loginService } from "../services/user";

export const useUser = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setAuthenticated(!!window.sessionStorage.getItem("token"));
  });

  const logout = () => {
    window.sessionStorage.removeItem("token");
    setAuthenticated(false);
  };

  const login = async (username: string, password = "") => {
    try {
      const token = loginService(username, password);
      setAuthenticated(true);
    } catch (e: any) {
      notification.open({
        message: "Error loggin in",
        description: String(e).toString(),
      });
    }
  };

  return { isAuthenticated, logout, login };
};
