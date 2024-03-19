import React, { useEffect, useState } from "react";
import HomeNavbar from "../../components/customer/header/HomeNavbar";
import ListHero from "../../components/customer/businessList/ListHero";
import Footer from "../../components/customer/footer/Footer";
import BusinessesList from "../../components/customer/businessList/BusinessesList";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../const/APIS";
import axios from "axios";
import { useSearchName } from "../../context/SearchNameContext";

const BusinessListPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0.0);
  const [sort, setSort] = useState("reviewCount");
  const { searchName } = useSearchName();
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.user);

  const queryParams = {
    ...(location && { location }),
    ...(searchName && { searchName }),
    ...(rating && { rating }),
    ...(sort && { sort }),
    category: id,
  };

  const navigate = useNavigate();

  // Create a copy of queryParams for deletion logic
  const newSearchParams = { ...queryParams };

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

  if (!token) {
    return <Navigate to="/customer/login" />;
  }

  useEffect(() => {
    const fetchBusinessList = async () => {
      try {
        console.log(queryParams, "queryParams");

        if (queryParams.category === undefined) {
          delete queryParams[Object.keys(queryParams).pop()];
          console.log(queryParams, "category inside");
        }

        // if (
        //   queryParams.rating === undefined &&
        //   queryParams.location != undefined &&
        //   queryParams.searchName != undefined
        // ) {
        //   const categoryPop = Object.values(queryParams).pop();
        //   delete queryParams[Object.keys(queryParams).pop()];
        //   delete queryParams[Object.keys(queryParams).pop()];
        //   queryParams.category = categoryPop;
        //   console.log(queryParams, "queryParams3 isnesd");
        // }

        const queryString = Object.keys(queryParams)
          .map(
            (key) =>
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(queryParams[key])
          )
          .join("&");
        console.log(queryString, "queryString");
        console.log(`${BASE_URL}businesses/search?${queryString}`);

        const response = await axios.get(
            `${BASE_URL}businesses/search?${queryString}`,
            {
              headers: {
                // Assuming the token is a Bearer token; adjust if using a different scheme
                Authorization: `Bearer ${token}`
              }
            }
        );


        setData(response.data);
        console.log(response.data, "response.data");

        // Conditional deletion of the last property in newSearchParams
        if (queryParams.category === undefined) {
          console.log(newSearchParams, "newSearchParams inside if");
          delete newSearchParams[Object.keys(newSearchParams).pop()];
          console.log(newSearchParams, "newSearchParams");

          const updatedQueryString = new URLSearchParams(
            newSearchParams
          ).toString();

          console.log(updatedQueryString, "updatedQueryString");

          navigate(`/customer/search?${updatedQueryString}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBusinessList();
  }, [id, location, searchName, rating, sort]);

  return (
    <>
      <HomeNavbar />
      <ListHero category={businessCategory} />
      <BusinessesList
        data={data}
        id={id}
        setLocation={setLocation}
        setRating={setRating}
        sort={sort}
        setSort={setSort}
      />
      <Footer />
    </>
  );
};

export default BusinessListPage;
