import React from "react";
import LoginNavbar from "../../components/customer/header/LoginNavbar";
import Footer from "../../components/customer/footer/Footer";
import Login from "../../components/customer/login/Login";

const LoginPage = () => {
  return (
    <>
      <LoginNavbar />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
