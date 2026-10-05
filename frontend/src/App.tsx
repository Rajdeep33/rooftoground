import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CustomerRegister from "./pages/auth/CustomerRegister";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/register/customer" element={<CustomerRegister />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;