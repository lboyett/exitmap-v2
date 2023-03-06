import Domain from "./pages/domain/Domain";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import DashHome from "./pages/dash-home/DashHome";
import DashSubmit from "./pages/dash-submit/DashSubmit";
import DashCountries from "./pages/dash-countries/DashCountries";
import Country from "./pages/dash-countries/country/Country";
import Exit from "./pages/dash-countries/country/exit/Exit";
import { Routes, Route } from "react-router-dom";
import "./app.css";
import { ExitDataContext } from "./ExitDataContext";
import { useState, useMemo, useEffect } from "react";
import useReviewedExitsFetch from "./hooks/useReviewedExitsFetch";

function App() {
  const [exitDataContext, setExitDataContext] = useState(null);

  const exitsData = useMemo(
    () => ({ exitDataContext, setExitDataContext }),
    [exitDataContext, setExitDataContext]
  );

  return (
    <div
      className="app"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
      }}
    >
      <ExitDataContext.Provider value={exitsData}>
        <Routes>
          <Route path="" element={<Domain />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<DashHome />} />
          <Route path="submit" element={<DashSubmit />} />
          <Route path="countries" element={<DashCountries />} />
          <Route path="countries/:country" element={<Country />} />
          <Route path="countries/:country/:exit" element={<Exit />} />
        </Routes>
      </ExitDataContext.Provider>
    </div>
  );
}

export default App;
