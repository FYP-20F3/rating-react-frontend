import React from "react";
import HomeNavbar from "../../components/customer/header/HomeNavbar";
import ListHero from "../../components/customer/businessList/ListHero";
import Footer from "../../components/customer/footer/Footer";
import BusinessLists from "../../components/customer/businessList/BusinessLists";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const BusinessListPage = () => {
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/customer/login" />;
  }

  return (
    <>
      <HomeNavbar />
      <ListHero />
      <BusinessLists />
      <Footer />
    </>
  );
};

export default BusinessListPage;
