import Domain from "./pages/domain/Domain";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import DashHome from "./pages/dash-home/DashHome";
import DashSubmit from "./pages/dash-submit/DashSubmit";
import DashCountries from "./pages/dash-countries/DashCountries";
import { Routes, Route } from "react-router-dom";
import "./app.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="" element={<Domain />} />
        <Route path="signup" element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='home' element={<DashHome />} />
        <Route path='submit' element={<DashSubmit />} />
        <Route path='countries' element={<DashCountries />} />
      </Routes>
    </div>
  );
}

export default App;
