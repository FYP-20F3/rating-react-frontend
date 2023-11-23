import React from "react";
import HomeNavbar from "../../components/customer/header/HomeNavbar";
import ListHero from "../../components/customer/businessList/ListHero";
import Footer from "../../components/customer/footer/Footer";
import BusinessLists from "../../components/customer/businessList/BusinessLists";

const BusinessListPage = () => {
  return (
    <>
      <HomeNavbar />
      <ListHero />
      <BusinessLists />
      <Footer/>
    </>
  );
};

export default BusinessListPage;
