import { useState, useEffect, useCallback } from "react";
import { notification } from "antd";
import { login as loginService } from "../services/user";

export const useUser = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setAuthenticated(!!window.sessionStorage.getItem("token"));
  });

  const logout = () => {
    console.log("running logout!!");
    window.sessionStorage.removeItem("token");
    setAuthenticated(false);
    // window.location.reload();
  };

  const login = async (username: string, password = "") => {
    try {
      console.log("long!!!!");
      const token = loginService(username, password);
      setAuthenticated(true);
      // window.sessionStorage.setItem("token", JSON.stringify(token));
      // window.location.reload();
    } catch (e: any) {
      console.log("whaaatttttt");
      notification.open({
        message: "Error loggin in",
        description: String(e).toString(),
      });
    }
  };
  return { isAuthenticated, logout, login };
};
