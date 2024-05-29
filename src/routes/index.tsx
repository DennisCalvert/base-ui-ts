import { Routes, Route } from "react-router-dom";
import { UsersList } from "views/Users/List";
import { UserDetail } from "views/Users/Detail";
import { Home } from "views/Home";
import { Inventory } from "views/Inventory";
import { EmailTester } from "views/EmailTester";
import { GearFinder } from "views/GearFinder";
import { Permissions } from "views/Users/Permissions";
// import { UseUser } from "hooks/useUser";
// import { UserContext } from "context/user";
// import { Unauthenticated } from "components/Unauthenticated";
const PageNotFound = () => <h1>Not Found</h1>;

export const AppRoutes = () => (
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
);
