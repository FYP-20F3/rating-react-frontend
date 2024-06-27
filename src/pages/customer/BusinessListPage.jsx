import React, { useEffect, useState } from "react";
import HomeNavbar from "@components/customer/header/HomeNavbar";
import ListHero from "@components/customer/businessList/ListHero";
import Footer from "@components/customer/footer/Footer";
import BusinessesList from "@components/customer/businessList/BusinessesList";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../const/APIS";
import axios from "axios";
import { useSearchName } from "../../context/SearchNameContext";
import { customerLoginPath } from "../../const/path";

const BusinessListPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0.0);
  const [sort, setSort] = useState("reviewCount");
  const { searchName } = useSearchName();
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const queryParams = {
    ...(location && { location }),
    ...(rating && { rating }),
    ...(sort && { sort }),
    category: id,
  };

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
    return <Navigate to={customerLoginPath} />;
  }

  useEffect(() => {
    let debounceTimer;

    const fetchBusinessList = async (params) => {
      try {
        console.log(params, "queryParams");

        if (params.category === undefined) {
          delete params[Object.keys(params).pop()];
          console.log(params, "category inside");
        }

        const queryString = Object.keys(params)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          )
          .join("&");
        console.log(queryString, "queryString");
        console.log(`${BASE_URL}businesses/search?${queryString}`);

        const response = await axios.get(
          `${BASE_URL}businesses/search?${queryString}`,
          {
            headers: {
              // Assuming the token is a Bearer token; adjust if using a different scheme
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        console.log(response.data, "response.data");

        // Conditional deletion of the last property in newSearchParams
        if (
          params.rating != undefined ||
          params.location != undefined ||
          params.searchName != undefined ||
          params.sort != undefined &&
          id === undefined
        ) {
          // console.log(params, "newSearchParams");

          const updatedQueryString = new URLSearchParams(params).toString();

          // console.log(updatedQueryString, "updatedQueryString");

          navigate(`/customer/search?${updatedQueryString}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Clear previous timer
    clearTimeout(debounceTimer);

    // Check if it's a searchName update, then debounce
    if (searchName) {
      // Set a new timer for 500ms (adjust as needed)
      debounceTimer = setTimeout(() => {
        // Update query parameters after debounce time
        const updatedQueryParams = {
          searchName: searchName,
          ...queryParams,
        };

        fetchBusinessList(updatedQueryParams);
      }, 1000); // 500ms delay
    } else {
      // Update immediately for other filters
      fetchBusinessList(queryParams);
    }

    return () => clearTimeout(debounceTimer); // Cleanup function to clear timer
  }, [id, location, searchName, rating, sort]);

  return (
    <>
      <HomeNavbar />
      <ListHero category={businessCategory} />
      <BusinessesList
        data={data}
        id={id ? id : "all"}
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
