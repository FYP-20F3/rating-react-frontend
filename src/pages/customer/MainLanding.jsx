import React from "react";
import HeroSection from "../../components/customer/main/Hero";
import CustomerFeatures from "../../components/customer/main/CustomerFeatures";
import BusinessFeatures from "../../components/customer/main/BusinessFeatures";
import Review from "../../components/customer/main/Review";
import WhyUs from "../../components/customer/main/WhyUs";
import Footer from "../../components/customer/footer/Footer";
import MainNavbar from "../../components/customer/header/MainNavbar";

const MainLanding = () => {
  return (
    <>
      <MainNavbar />
      <HeroSection />
      <CustomerFeatures />
      <BusinessFeatures />
      <Review />
      <WhyUs />
      <Footer />
    </>
  );
};

export default MainLanding;
