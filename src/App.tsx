import "./App.css";
import { AppLayout } from "./components/Layout";
import { UseUser } from "hooks/useUser";
import { UserContext } from "context/user";
import { AppRoutes, UnathenticatedRoutes } from "routes";
import { Content } from "antd/es/layout/layout";

function App() {
  const auth = UseUser();

  return (
    <div className="App">
      {auth.isAuthenticated && auth.userData ? (
        <UserContext.Provider value={auth.userData}>
          <AppLayout auth={auth}>
            <AppRoutes />
          </AppLayout>
        </UserContext.Provider>
      ) : (
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column",
          }}
        >
          <UnathenticatedRoutes auth={auth} />
        </Content>
      )}
    </div>
  );
}

export default App;
