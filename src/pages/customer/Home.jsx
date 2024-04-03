import React from "react";
import HomeNavbar from "../../components/customer/header/HomeNavbar";
import HomeHero from "../../components/customer/home/HomeHero";
import Review from "../../components/customer/main/Review";
import Footer from "../../components/customer/footer/Footer";
import Explore from "../../components/customer/home/Explore";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { customerLoginPath } from "../../const/path";

const Home = () => {
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to={customerLoginPath} />;
  }

  return (
    <>
      <HomeNavbar />
      <HomeHero />
      <Explore />
      <Review />
      <Footer />
    </>
  );
};

export default Home;
