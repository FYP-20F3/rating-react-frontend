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
import {
  customerLoginPath,
  businessLoginPath,
  AdminLoginPath,
} from "./const/path";
import ErrorPage from "./pages/ErrorPage";
import Reviews from "./pages/business/dashboard/sidebarPages/Reviews";
import BusinessInfoPage from "./pages/customer/BusinessInfoPage";
import { SearchNameProvider } from "./context/SearchNameContext";
import CreateReviewPage from "./pages/customer/CreateReviewPage";
import Analysis from "./pages/business/dashboard/sidebarPages/Analysis";
import AdminLogin from "./pages/admin/login/AdminLogin";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminHome from "./pages/admin/dashboard/adminsidebarPages/AdminHome";
import ManageReviews from "./pages/admin/dashboard/adminsidebarPages/ManageReviews";
import ManageCustomers from "./pages/admin/dashboard/adminsidebarPages/ManageCustomers";
import ManageBusinesses from "./pages/admin/dashboard/adminsidebarPages/ManageBusinesses";
import { OpenStateProvider } from "./context/AdminOpenContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainLanding />} />

        {/* customer */}
        <Route path="/customer">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            element={
              <PrivateRoute
                path={{ url: customerLoginPath, role: "customer" }}
              />
            }
          >
            <Route element={<SearchNameProvider />}>
              <Route path="home" element={<Home />} />
              <Route path="category/:id" element={<BusinessListPage />} />
              <Route path="search" element={<BusinessListPage />} />
            </Route>
            <Route
              path="reviews/:businessId/:businessName"
              element={<BusinessInfoPage />}
            />
            <Route
              path="evaluate/:businessId/:businessName"
              element={<CreateReviewPage />}
            />
          </Route>
        </Route>

        {/* business */}

        <Route path="/business">
          <Route path="login" element={<BusinessLogin />} />
          <Route path="register" element={<BusinessRegister />} />
          <Route
            element={
              <PrivateRoute
                path={{ url: businessLoginPath, role: "business" }}
              />
            }
          >
            <Route element={<BusinessDashboard />}>
              <Route path="dashboard" element={<BusinessHome />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="reviews/service" element={<ServiceReviews />} />
              <Route path="reviews/analysis" element={<Analysis />} />
            </Route>
          </Route>
        </Route>

        {/* admin */}
        <Route path="/admin">
          <Route path="login" element={<AdminLogin />} />
          <Route
            element={
              <PrivateRoute path={{ url: AdminLoginPath, role: "admin" }} />
            }
          >
            <Route
              element={
                <OpenStateProvider>
                  <AdminDashboard />
                </OpenStateProvider>
              }
            >
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="manage/reviews" element={<ManageReviews />} />
              <Route path="manage/customers" element={<ManageCustomers />} />
              <Route path="manage/businesses" element={<ManageBusinesses />} />
            </Route>
          </Route>
        </Route>
        {/* error */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
