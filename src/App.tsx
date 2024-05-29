import "./App.css";
import { AppLayout } from "./components/Layout";
import { UserType } from "types/User";
import { UseUser } from "hooks/useUser";
import { UserContext } from "context/user";
import { Unauthenticated } from "components/Unauthenticated";
import { AppRoutes } from "routes";

function App() {
  const auth = UseUser();

  const onLoginFinish = async (data: UserType): Promise<void> => {
    const { email, password } = data;
    await auth.login(email, password);
  };

  const onLoginFailed = (e: any) => {
    console.log("Failed:", e);
  };

  return (
    <div className="App">
      {auth.isAuthenticated && auth.userData ? (
        <UserContext.Provider value={auth.userData}>
          <AppLayout logout={auth.logout}>
            <AppRoutes />
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
