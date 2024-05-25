import "./app.scss";
import { IndexedDBProvider } from "./components/contexts/IDBContext";
import { ScrollProvider } from "./components/contexts/ScrollContext";
import { UserProvider } from "./components/contexts/UserContext.jsx";
import { LoggedInUser, ProtectedRoutes } from "./pages/ProtectedRoutes.jsx";
import * as Pages from "./pages/indexPages.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ScrollProvider>
        <IndexedDBProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Pages.Frontpage />} />
              <Route element={<LoggedInUser />}>
                <Route path="/Login" element={<Pages.Login />} />
                <Route path="/Signup" element={<Pages.Signup />} />
                <Route path="/Signup/:userEmail" element={<Pages.Signup />} />
                <Route
                  path="/ResetPassword"
                  element={<Pages.ResetPassword />}
                />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/Home" element={<Pages.Home />} />
                <Route path="/Watch/:url" element={<Pages.Watch />} />
                <Route path="/Movies" element={<Pages.Movies />} />
                <Route path="/Series" element={<Pages.Series />} />
                <Route path="/Kids" element={<Pages.Kids />} />
              </Route>
              <Route path="/*" element={<Pages.NotFound />} />
            </Routes>
          </UserProvider>
        </IndexedDBProvider>
      </ScrollProvider>
    </BrowserRouter>
  );
}

export default App;
