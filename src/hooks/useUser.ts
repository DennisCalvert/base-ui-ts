import { useState, useEffect, useCallback } from "react";
import { login as loginService } from "../services/user";
import { UserWithTokenType } from "types/User";
import { useNavigate } from "react-router-dom";

export const UseUser = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isAccountVerified, setIsAccountVerified] = useState<boolean | null>(
    null
  );
  const [userData, setUserData] = useState<UserWithTokenType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isSessionValid = !!window.sessionStorage.getItem("token");
  //   setAuthenticated(isSessionValid);
  // }, []);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    setAuthenticated(false);
    setIsAccountVerified(null);
    navigate("/");
  };

  const login = async (email: string, password: string | undefined) => {
    setIsLoading(true);
    try {
      const data = await loginService(email, password);
      setIsAccountVerified(!!data.isAccountVerified);

      if (data && data.token) {
        window.sessionStorage.setItem("token", JSON.stringify(data.token));
        setAuthenticated(true);
        setUserData(data);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return {
    isAuthenticated,
    logout,
    login,
    userData,
    isAccountVerified,
    isLoading,
  };
};
