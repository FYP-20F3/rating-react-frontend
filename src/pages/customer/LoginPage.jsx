import React from "react";
import LoginNavbar from "@components/customer/header/LoginNavbar";
import Footer from "@components/customer/footer/Footer";
import Login from "@components/customer/login/Login";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { token, currentUser, role } = useSelector((state) => state.user);

  console.log(token, currentUser, role);

  if (token && currentUser && role === "customer") {
    console.log("redirect");
    return <Navigate to="/customer/home" />;
  }

  return (
    <>
      <LoginNavbar />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
