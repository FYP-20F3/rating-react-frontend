import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { ResponsiveBar } from "@nivo/bar"; // Import Nivo ResponsiveBar
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../const/APIS";
import { Line } from "@nivo/line";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Box,
  IconButton,
  TableFooter,
} from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";

export const RevCatYearlyLineChart = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [reviewByYear, setReviewByYear] = useState([]);
  const [totalReview, setTotalReview] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = {
    product: "#FF5733", // Orange
    delivery: "#33FF57", // Green
    packaging: "#3366FF", // Blue
    service: "#FF33EA", // Pink
  };

  useEffect(() => {
    filterReviews();
  }, []);

  const filterReviews = async () => {
    // Assuming currentUser and token are defined somewhere in your component or context

    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}reviews/business/${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const processedData = processData(response.data);
      setReviewByYear(processedData);

      const sortedData = processedData.sort((a, b) => {
        return a.year - b.year;
      });

      setReviews(sortedData); // Update this line
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const processData = (reviews) => {
    const groupedData = {};

    reviews.forEach((review) => {
      const reviewDate = new Date(review.createdAt);
      const year = reviewDate.getFullYear().toString();

      // Initialize the year object if it doesn't exist
      if (!groupedData[year]) {
        groupedData[year] = {
          year,
          product: 0,
          delivery: 0,
          packaging: 0,
          service: 0,
        };
      }

      // Increment the count for the reviewType
      const reviewType = review.reviewType;
      if (reviewType in groupedData[year]) {
        groupedData[year][reviewType]++;
      } else {
        console.error("Unexpected review type value:", reviewType);
        // Initialize with 1 if the type is unexpected to account for this review
        groupedData[year][reviewType] = 1;
      }
    });

    // Convert the object into an array of year objects
    return Object.values(groupedData);
  };

  const LineChart = ({ data }) => {
    // Transform data for Nivo Line chart
    const defs = [
      {
        id: "gradientA",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "inherit" },
          { offset: 100, color: "inherit", opacity: 0 },
        ],
      },
    ];
    const lineChartData = [
      {
        id: "Product",
        data: data.map((yearData) => ({
          x: yearData.year,
          y: yearData.product || 0, // Ensure a value is provided even if it's 0
        })),
        color: colors.product,
      },
      {
        id: "Delivery",
        data: data.map((yearData) => ({
          x: yearData.year,
          y: yearData.delivery || 0,
        })),
        color: colors.delivery,
      },
      {
        id: "Packaging",
        data: data.map((yearData) => ({
          x: yearData.year,
          y: yearData.packaging || 0,
        })),
        color: colors.packaging,
      },
      {
        id: "Service",
        data: data.map((yearData) => ({
          x: yearData.year,
          y: yearData.service || 0,
        })),
        color: colors.service,
      },
    ];
    const CustomTooltip = ({ point }) => {
      // Check the structure of `point` in your console to ensure correct data access
      return (
        <div
          style={{
            background: "white",
            padding: "9px 12px",
            border: "1px solid #ccc",
          }}
        >
          <strong>{point.data.xFormatted}</strong>
          <div>
            {point.serieId}: {point.data.yFormatted}
          </div>
          <div>Total reviews: {point.data.y}</div>
        </div>
      );
    };

    return (
      <div className="tw-flex tw-justify-center tw-items-center">
        <div className=" tw-bg-[#fffffc] tw-pt-5 tw-mt-5 tw-rounded-lg hover:tw-shadow-md tw-mr-8 tw-ml-4">
          <Line
            width={980}
            defs={defs}
            colors={{ datum: "color" }}
            tooltip={CustomTooltip}
            height={400}
            data={lineChartData}
            margin={{ top: 40, right: 40, bottom: 55, left: 80 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Year",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Sentiment Percentage",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            // Other necessary props and styling
          />
        </div>
      </div>
    );
  };

  return (
    <Box className={`${loading ? "tw-h-[100vh]" : ""}`}>
      {/* <p className="legend-container " style={{ marginBottom: "10px" }}>Analysis for reviews based on sentiments</p>
      <div className="legend-container">
        {Object.keys(colors).map((sentiment) => (
          <div
            key={sentiment}
            className="legend-item"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              marginRight: "20px", // Adjust as needed for spacing between items
            }}
          >
            <span
              className="legend-color"
              style={{
                backgroundColor: colors[sentiment],
                width: "20px",
                height: "20px",
                display: "inline-block",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            ></span>
            <span className="legend-text" style={{ fontWeight: "bold" }}>{sentiment} sentiment</span>
          </div>
        ))}
      </div> */}

      {reviews.length == 0 && loading && (
        <p className="tw-text-xl tw-flex tw-justify-center tw-items-center tw-h-5/6">
          No reviews data available
        </p>
      )}
      {reviews.length > 0 && <ReviewsTable data={reviewByYear} />}
      {reviews.length > 0 && <LineChart data={reviews} />}

      {/* {reviews.length > 0 ? <BarChart /> : <p>No reviews data available</p>} */}
    </Box>
  );
};


const ReviewsTable = ({ data }) => {
  const [orderBy, setOrderBy] = useState("year"); // Initial sort order by monthYear
  const [order, setOrder] = useState("asc"); // Initial sort direction

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = data.slice().sort((a, b) => {
    switch (orderBy) {
      case "year":
        return order === "asc"
          ? a.year.localeCompare(b.year)
          : b.year.localeCompare(a.year);
      case "product":
        return order === "asc" ? a.product - b.product : b.product - a.product;
      case "delivery":
        return order === "asc"
          ? a.delivery - b.delivery
          : b.delivery - a.delivery;
      case "packaging":
        return order === "asc"
          ? a.packaging - a.packaging
          : b.packaging - a.packaging;
      case "service":
        return order === "asc" ? a.service - a.service : b.service - a.service;
      default:
        return 0;
    }
  });

  return (
    <div className="tw-flex tw-justify-center tw-mt-6 tw-mb-7">
      <TableContainer className="tw-w-10/12 tw-overflow-x-auto tw-shadow-md reviews-table">
        <Table stickyHeader className="tw-text-left tw-text-sm">
          <caption className="tw-bg-white">
            Review Counts by Type and Year
          </caption>
          <TableHead>
            <TableRow className="header-cell-div">
              <TableCell
                key="year"
                sortDirection={orderBy === "year" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "year"}
                  direction={orderBy === "year" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "year")}
                  className="header-cell"
                >
                  Year
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="product"
                sortDirection={orderBy === "product" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "product"}
                  direction={orderBy === "product" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "product")}
                  className="header-cell"
                >
                  Product
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="delivery"
                sortDirection={orderBy === "delivery" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "delivery"}
                  direction={orderBy === "delivery" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "delivery")}
                  className="header-cell"
                >
                  Delivery
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="packaging"
                sortDirection={orderBy === "packaging" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "packaging"}
                  direction={orderBy === "packaging" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "packaging")}
                  className="header-cell"
                >
                  Packaging
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="service"
                sortDirection={orderBy === "service" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "service"}
                  direction={orderBy === "service" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "service")}
                  className="header-cell"
                >
                  Service
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? sortedData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : sortedData
            ).map((row) => (
              <TableRow key={row.year}>
                <TableCell className="tw-py-4 tw-px-6">
                  {row.year}
                </TableCell>
                <TableCell className="tw-py-4 tw-px-6">
                  {Math.round(row.product)}
                </TableCell>
                <TableCell className="tw-py-4 tw-px-6">
                  {Math.round(row.delivery)}
                </TableCell>
                <TableCell className="tw-py-4 tw-px-6">
                  {Math.round(row.packaging)}
                </TableCell>
                <TableCell className="tw-py-4 tw-px-6">
                  {Math.round(row.service)}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleBackButtonClick = () => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};
