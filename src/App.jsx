import { ThemeProvider } from "@mui/system";
import theme from "./themeStyles";
import MainLanding from "./pages/customer/MainLanding";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/customer/Home";
import RegisterPage from "./pages/customer/RegisterPage";
import LoginPage from "./pages/customer/LoginPage";
import BusinessListPage from "./pages/customer/BusinessListPage";
import BusinessLogin from "./pages/business/login/BusinessLogin";
import BusinessRegister from "./pages/business/register/BusinessRegister";
import BusinessDashboard from "./pages/business/dashboard/BusinessDashboard";
import BusinessHome from "./pages/business/dashboard/sidebarPages/BusinessHome";
import ServiceReviews from "./pages/business/dashboard/sidebarPages/ServiceReviews";
import CustomerPrivateRoute from "./CustomerPrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainLanding />} />

        {/* customer */}
        <Route path="/customer">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<CustomerPrivateRoute />}>
            <Route path="home" element={<Home />} />
          </Route>
          <Route element={<CustomerPrivateRoute />}>
            <Route path="home/category/:id" element={<BusinessListPage />} />
          </Route>
        </Route>

        {/* business */}

        <Route path="/business">
          <Route path="login" element={<BusinessLogin />} />
          <Route path="register" element={<BusinessRegister />} />
          <Route path="dashboard" element={<BusinessDashboard />}>
            <Route index element={<BusinessHome />} />
            <Route path="reviews/service" element={<ServiceReviews />} />
          </Route>
        </Route>

        {/* admin */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
