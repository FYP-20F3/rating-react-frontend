import { ThemeProvider } from "@mui/system";
import theme from "./themeStyles";
import MainLanding from "./pages/customer/MainLanding";
import RegisterPage from "./pages/customer/RegisterPage";
import LoginPage from "./pages/customer/LoginPage";
import Home from "./pages/customer/Home";
import BusinessListPage from "./pages/customer/BusinessListPage";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/category/:category" element={<BusinessListPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
