import { useState } from "react";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { AppLayout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { UserType } from "types/User";
import { blankUser } from "context/user";

import { UsersList } from "./views/Users/List";
import { UserDetail } from "./views/Users/Detail";
import { Home } from "./views/Home";
import { Inventory } from "views/Inventory";
import { EmailTester } from "views/EmailTester";
import { GearFinder } from "views/GearFinder";
import { Permissions } from "views/Users/Permissions";
import { login as longinService } from "services/user";
import { UserContext } from "context/user";

const PageNotFound = () => <h1>Not Found</h1>;

function App() {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserType>(blankUser);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    setAuthenticated(false);
  };

  const onLoginFinish = async (data: UserType): Promise<void> => {
    const { email, password } = data;
    try {
      setLoading(true);
      const res = await longinService(email, password);
      setUserData(res);
      setAuthenticated(true);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onLoginFailed = (e: any) => {
    console.log("Failed:", e);
  };

  console.log({ userData });

  return (
    <div className="App">
      {isAuthenticated ? (
        <UserContext.Provider value={userData}>
          <AppLayout logout={logout}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/inventory/:userId" element={<Inventory />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/email" element={<EmailTester />} />
              <Route path="/gear-finder" element={<GearFinder />} />
              <Route path="/permissions" element={<Permissions />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AppLayout>
        </UserContext.Provider>
      ) : (
        <LoginForm
          onLoginFinish={onLoginFinish}
          onLoginFailed={onLoginFailed}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
