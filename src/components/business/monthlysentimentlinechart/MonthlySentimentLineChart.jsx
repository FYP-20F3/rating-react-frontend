import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
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

const MonthlySentimentLineChart = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [reviewByMonth, setReviewByMonth] = useState([]); // Updated variable name
  const [totalReview, setTotalReview] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = {
    Positive: "#4caf50",
    Negative: "#d32f2f",
    Neutral: "#ffc107",
  };

  useEffect(() => {
    filterReviews();
  }, []);

  const filterReviews = async () => {
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
      const sortedData = processedData.sort((a, b) => {
        const [aYear, aMonth] = a.monthYear.split("-").map(Number);
        const [bYear, bMonth] = b.monthYear.split("-").map(Number);
        if (aYear !== bYear) {
          return aYear - bYear;
        }
        return aMonth - bMonth;
      });

      setReviewByMonth(sortedData);
      const lastTwelveMonthsData = sortedData.slice(-12);
      const totalSortedReviews = lastTwelveMonthsData.reduce(
        (total, data) => total + data.total,
        0
      );
      setTotalReview(totalSortedReviews); // Update variable name
      setReviews(sortedData);
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
      // console.log(reviewDate);

      const monthYear = `${reviewDate.getFullYear()}-${String(
        reviewDate.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!groupedData[monthYear]) {
        groupedData[monthYear] = {
          monthYear,
          Positive: 0,
          Negative: 0,
          Neutral: 0,
          total: 0,
        };
      }

      const sentiment = review.Sentiment;
      if (groupedData[monthYear][sentiment] !== undefined) {
        groupedData[monthYear][sentiment]++;
      } else {
        console.error("Unexpected sentiment value:", sentiment);
      }
      groupedData[monthYear].total++;
    });

    // console.log(groupedData);
    return Object.values(groupedData);
  };

  const LineChart = ({ data }) => {
    // console.log(data);
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
        id: "Positive",
        data: data.map((monthData) => ({
          // Updated variable name
          x: monthData.monthYear,
          y: monthData.Positive,
        })),
        color: colors.Positive,
      },
      {
        id: "Negative",
        data: data.map((monthData) => ({
          // Updated variable name
          x: monthData.monthYear,
          y: monthData.Negative,
        })),
        color: colors.Negative,
      },
      {
        id: "Neutral",
        data: data.map((monthData) => ({
          // Updated variable name
          x: monthData.monthYear,
          y: monthData.Neutral,
        })),
        color: colors.Neutral,
      },
    ];

    return (
      <div className="tw-flex tw-justify-center tw-items-center">
        <div className="tw-bg-[#fffffc] tw-pt-5 tw-mt-5 tw-rounded-lg hover:tw-shadow-md tw-mr-8 tw-ml-2">
          <Line
            width={1000}
            defs={defs}
            height={450}
            data={lineChartData}
            colors={{ datum: "color" }}
            margin={{ top: 20, right: 35, bottom: 70, left: 70 }}
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
              tickPadding: 8,
              tickRotation: -45,
              legend: "Month",
              legendOffset: 59,
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
          />
        </div>
      </div>
    );
  };

  const BarChart = () => {
    const tickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    return (
      <ResponsiveBar
        data={reviews}
        keys={["Positive", "Negative", "Neutral"]}
        indexBy="monthYear"
        colors={({ id, data }) => colors[id]}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        minValue={0}
        maxValue={100}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        enableLabel={false}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Reviews",
          legendPosition: "middle",
          legendOffset: -40,
          tickValues: tickValues,
        }}
      />
    );
  };

  return (
    <div className={`${loading ? "tw-h-[100vh]" : ""}`}>
      {reviewByMonth.length == 0 && loading && (
        <p className="tw-text-xl tw-flex tw-justify-center tw-items-center tw-h-3/6">
          No reviews data available
        </p>
      )}
      {reviewByMonth.length > 0 && (
        <TotalReviewsCard totalReviews={totalReview} />
      )}
      {reviewByMonth.length > 0 && <ReviewsTable data={reviewByMonth} />}

      <p className="legend-container tw-mb-4 tw-mt-7">
        Analysis for reviews based on sentiments
      </p>
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
            <span className="legend-text" style={{ fontWeight: "bold" }}>
              {sentiment} sentiment
            </span>
          </div>
        ))}
      </div>
      {reviewByMonth.length > 0 && (
        <LineChart data={reviewByMonth} className="tw-mb-1" />
      )}
    </div>
  );
};

export default MonthlySentimentLineChart;

const TotalReviewsCard = ({ totalReviews }) => {
  return (
    <div className="tw-mt-3 tw-flex tw-justify-center tw-items-center">
      <h3>Total Reviews in the last 12 month: </h3>
      <p className="tw-ml-2 tw-text-xl">{totalReviews}</p>
    </div>
  );
};

const ReviewsTable = ({ data }) => {
  const [orderBy, setOrderBy] = useState("monthYear"); // Initial sort order by monthYear
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
      case "monthYear":
        return order === "asc"
          ? a.monthYear.localeCompare(b.monthYear)
          : b.monthYear.localeCompare(a.monthYear);
      case "Positive":
        return order === "asc"
          ? a.Positive - b.Positive
          : b.Positive - a.Positive;
      case "Negative":
        return order === "asc"
          ? a.Negative - b.Negative
          : b.Negative - a.Negative;
      case "Neutral":
        return order === "asc" ? a.Neutral - a.Neutral : b.Neutral - a.Neutral;
      default:
        return 0;
    }
  });

  return (
    <div className="tw-flex tw-justify-center tw-mt-6">
      <TableContainer className="tw-w-10/12 tw-overflow-x-auto tw-shadow-md reviews-table">
        <Table stickyHeader className="tw-text-left tw-text-sm">
          <caption className="tw-bg-white">Review Sentiments by Month</caption>
          <TableHead>
            <TableRow className="header-cell-div">
              <TableCell
                key="monthYear"
                sortDirection={orderBy === "monthYear" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "monthYear"}
                  direction={orderBy === "monthYear" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "monthYear")}
                  className="header-cell"
                >
                  Month
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="Positive"
                sortDirection={orderBy === "Positive" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "Positive"}
                  direction={orderBy === "Positive" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "Positive")}
                  className="header-cell"
                >
                  Positive
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="Negative"
                sortDirection={orderBy === "Negative" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "Negative"}
                  direction={orderBy === "Negative" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "Negative")}
                  className="header-cell"
                >
                  Negative
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="Neutral"
                sortDirection={orderBy === "Neutral" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "Neutral"}
                  direction={orderBy === "Neutral" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "Neutral")}
                  className="header-cell"
                >
                  Neutral
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
              <TableRow key={row.monthYear}>
                <TableCell className="tw-py-4 tw-px-6">
                  {row.monthYear}
                </TableCell>
                <TableCell className="tw-py-4 tw-px-6">
                  {Math.round(row.Positive)}
                </TableCell>
                <TableCell className="tw-py-4 tw-px-6">
                  {Math.round(row.Negative)}
                </TableCell>
                <TableCell className="tw-py-4 tw-px-6">
                  {Math.round(row.Neutral)}
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
