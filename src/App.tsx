import { useState } from "react";
// import "antd/dist/antd.css";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { AppLayout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { UserType } from "types/User";

import { UsersList } from "./views/Users/List";
import { UserDetail } from "./views/Users/Detail";
import { Home } from "./views/Home";
import { Inventory } from "views/Inventory";
import { EmailTester } from "views/EmailTester";

import { login as longinService } from "services/user";

const PageNotFound = () => <h1>Not Found</h1>;

function App() {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    setAuthenticated(false);
  };

  const onLoginFinish = async (data: UserType): Promise<any> => {
    const { email, password } = data;
    try {
      setLoading(true);
      await longinService(email, password);
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

  return (
    <div className="App">
      {isAuthenticated ? (
        <AppLayout logout={logout}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/inventory/:userId" element={<Inventory />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/email" element={<EmailTester />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AppLayout>
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
