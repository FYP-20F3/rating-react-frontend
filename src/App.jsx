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
      {/* <Routes> */}
        {/* <Route path="/" element={<MainLanding />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />ge />
        <LoginPage 
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" component={BusinessListPage} /> */}
        {/* <MainLanding /> */}
         {/* <RegisterPage/> */}
        {/* <LoginPage /> */}
        {/* <Home /> */}
        <BusinessListPage /> 
      {/* </Routes> */}
    </ThemeProvider>
  );
}

export default App;
