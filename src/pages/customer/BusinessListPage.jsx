import React, { useEffect, useState } from "react";
import HomeNavbar from "../../components/customer/header/HomeNavbar";
import ListHero from "../../components/customer/businessList/ListHero";
import Footer from "../../components/customer/footer/Footer";
import BusinessesList from "../../components/customer/businessList/BusinessesList";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../const/APIS";
import axios from "axios";
import { useSearchName } from "../../context/SearchNameContext";

const BusinessListPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0.0);
  const { searchName } = useSearchName();
  const [data, setData] = useState([]);

  let businessCategory =
    id === "electronics_tech"
      ? "Electronics & Tech"
      : id === "clothing_store"
      ? "Clothing Store"
      : id === "cosmetics"
      ? "Cosmetics"
      : id === "food"
      ? "Food"
      : "All Categories";

  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/customer/login" />;
  }

  useEffect(() => {
    const fetchBusinessList = async () => {
      try {
        const queryParams = {
          ...(location && { location }),
          ...(searchName && { searchName }),
          ...(rating && { rating }),
          category: id !== "all" ? id : "",
        };

        const queryString = Object.keys(queryParams)
          .map(
            (key) =>
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(queryParams[key])
          )
          .join("&");

        const response = await axios.get(
          `${BASE_URL}businesses/search?${queryString}`
        );

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBusinessList();
  }, [id, location, searchName, rating]);

  return (
    <>
      <HomeNavbar />
      <ListHero category={businessCategory} />
      <BusinessesList
        data={data}
        setLocation={setLocation}
        setRating={setRating}
      />
      <Footer />
    </>
  );
};

export default BusinessListPage;
