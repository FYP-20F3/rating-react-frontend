import { useParams } from "react-router-dom";
import InfoHero from "../../components/customer/businessInfo/InfoHero";
import ReviewsList from "../../components/customer/businessInfo/ReviewsList";
import Footer from "../../components/customer/footer/Footer";
import HomeNavbar from "../../components/customer/header/HomeNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../const/APIS";
import { useSelector } from "react-redux";

const BusinessInfoPage = () => {
  const { businessId } = useParams();
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.user);
  // console.log(businessId);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        console.log(`${BASE_URL}businesses/${businessId}`);
        const response = await axios.get(
          `${BASE_URL}businesses/${businessId}`,
          {
            headers: {
              // Assuming the token is a Bearer token; adjust if using a different scheme
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        console.log(response.data, "hellllo");
      } catch (error) {
        console.log(error);
      }
    };

    fetchBusinessInfo();
  }, [businessId]);
  
  return (
    <>
      <HomeNavbar />
      <InfoHero data={data} />
      <ReviewsList data={data} />
      <Footer />
    </>
  );
};
export default BusinessInfoPage;
