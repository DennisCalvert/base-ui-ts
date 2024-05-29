import { useState } from "react";
import { login as loginService } from "../services/user";
import { UserWithTokenType } from "types/User";
import { useNavigate, useLocation } from "react-router-dom";

export type AuthType = {
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  userData: UserWithTokenType | undefined;
  isAccountVerified: boolean | null;
  isLoading: boolean;
};
export const UseUser = (): AuthType => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isAccountVerified, setIsAccountVerified] = useState<boolean | null>(
    null
  );
  const [userData, setUserData] = useState<UserWithTokenType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      setIsAccountVerified(data.isAccountVerified === true);

      if (data && data.token) {
        window.sessionStorage.setItem("token", JSON.stringify(data.token));
        setAuthenticated(true);
        setUserData(data);
        navigate(location);
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
