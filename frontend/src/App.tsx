import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CustomerRegister from "./pages/auth/CustomerRegister";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register/customer" element={<CustomerRegister />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;