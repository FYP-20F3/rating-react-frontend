import React from "react";
import HomeNavbar from "../../components/customer/header/HomeNavbar";
import HomeHero from "../../components/customer/home/HomeHero";
import Review from "../../components/customer/main/Review";
import Footer from "../../components/customer/footer/Footer";
import Explore from "../../components/customer/home/Explore";

const Home = () => {
  return(
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
