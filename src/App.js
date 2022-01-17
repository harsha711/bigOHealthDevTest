import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import ProtectedRoutes from "./ProtectedRoutes";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ auth: false });
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Router basename="big-o-health-dev-test">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/view" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
