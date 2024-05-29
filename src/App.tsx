import { useState } from "react";
import "./App.css";
// import { LoginForm } from "./components/LoginForm";
import { AppLayout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { UserType, UserWithTokenType } from "types/User";
import { blankUser } from "context/user";

import { UsersList } from "./views/Users/List";
import { UserDetail } from "./views/Users/Detail";
import { Home } from "./views/Home";
import { Inventory } from "views/Inventory";
import { EmailTester } from "views/EmailTester";
import { GearFinder } from "views/GearFinder";
import { Permissions } from "views/Users/Permissions";
import { UseUser } from "hooks/useUser";
import { UserContext } from "context/user";
import { Unauthenticated } from "components/Unauthenticated";

const PageNotFound = () => <h1>Not Found</h1>;

function App() {
  const auth = UseUser();

  const onLoginFinish = async (data: UserType): Promise<void> => {
    const { email, password } = data;
    await auth.login(email, password);
  };

  const onLoginFailed = (e: any) => {
    console.log("Failed:", e);
  };

  // if (!auth.isAccountVerified) {
  //   return <div>Check your email...</div>;
  // }
  return (
    <div className="App">
      {auth.isAuthenticated && auth.userData ? (
        <UserContext.Provider value={auth.userData}>
          <AppLayout logout={auth.logout}>
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
        <Unauthenticated
          onLoginFinish={onLoginFinish}
          onLoginFailed={onLoginFailed}
          isLoading={auth.isLoading}
          isAccountVerified={auth.isAccountVerified}
        />
      )}
    </div>
  );
}

export default App;
