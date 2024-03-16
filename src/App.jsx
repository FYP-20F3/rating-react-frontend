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
import PrivateRoute from "./PrivateRoute";
import { customerLoginPath, businessLoginPath } from "./const/path";
import ErrorPage from "./pages/ErrorPage";
import BusinessInfoPage from "./pages/customer/BusinessInfoPage";
import { SearchNameProvider } from "./context/SearchNameContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainLanding />} />

        {/* customer */}
        <Route path="/customer">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<PrivateRoute path={customerLoginPath} />}>
            <Route element={<SearchNameProvider />}>
              <Route path="home" element={<Home />} />
              <Route path="category/:id" element={<BusinessListPage />} />
            </Route>
            <Route path="reviews/:businessId" element={<BusinessInfoPage />} />
          </Route>
        </Route>

        {/* business */}

        <Route path="/business">
          <Route path="login" element={<BusinessLogin />} />
          <Route path="register" element={<BusinessRegister />} />
          <Route element={<PrivateRoute path={businessLoginPath} />}>
            <Route path="dashboard" element={<BusinessDashboard />}>
              <Route index element={<BusinessHome />} />
              <Route path="reviews/service" element={<ServiceReviews />} />
            </Route>
          </Route>
        </Route>

        {/* admin */}

        {/* error */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
