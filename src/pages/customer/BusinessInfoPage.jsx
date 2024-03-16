import InfoHero from "../../components/customer/businessInfo/InfoHero";
import ReviewsList from "../../components/customer/businessInfo/ReviewsList";
import Footer from "../../components/customer/footer/Footer";
import HomeNavbar from "../../components/customer/header/HomeNavbar";

const BusinessInfoPage = () => {
  return (
    <>
      <HomeNavbar />
      <InfoHero />
      <ReviewsList />
      <Footer /> 
    </>
  );
};
export default BusinessInfoPage;
