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
  Typography,
  Chip,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Block,
  Delete,
  LockOpen,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../const/APIS";
import moment from "moment";
import { useOpenState } from "../../../../context/AdminOpenContext";

const ManageBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const { open } = useOpenState();

  const getBusinesses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}businesses/`);
      setBusinesses(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  const deleteBusiness = async (businessId) => {
    console.log(businessId, "customerId");

    try {
      console.log(`${BASE_URL}businesses/${businessId}`);
      const response = await axios.delete(
        `${BASE_URL}businesses/${businessId}`
      );
      console.log("response:", response);

      if (response.status === 200) {
        console.log(`${response.data.msg}`);
        setError(`${response.data.msg}`);
        setOpenToast(true);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
      setOpenToast(true);
    }
  };

  const blockBusiness = async (business) => {
    let businessId = business._id;

    let block = "block";

    if (business.block === true) {
      block = "unblock";
    }

    try {
      console.log(`${BASE_URL}businesses/${businessId}/block`);
      const response = await axios.put(
        `${BASE_URL}businesses/${businessId}/block`,
        {
          action: block,
        }
      );
      console.log("response:", response);

      if (response.status === 200) {
        setError(`${response.data.msg}`);
        setOpenToast(true);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
      setOpenToast(true);
    }
  };

  return (
    <div
      className={businesses.length === 0 ? "tw-h-[90vh] tw-mb-10" : "tw-mb-10"}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 5, ml: 2 }}>
        <Box
          component="img"
          src="../../../src/assets/manage_business.png"
          alt="Manage Customers"
          className="tw-w-24 tw-h-24"
        />
        <Box>
          <Typography
            variant="h5"
            className="tw-font-semibold tw-text-orange-500 tw-mb-2"
          >
            Business Management Hub
          </Typography>
          <Typography className="tw-font-medium tw-text-[15px]  tw-mb-3 ">
            Command your business database with precision.
          </Typography>
        </Box>
      </Box>
      <BusinessTable
        data={businesses}
        deleteBusiness={deleteBusiness}
        blockBusiness={blockBusiness}
        open={open}
      />
      <Snackbar open={openToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{ width: "100%" }}
          className="tw-bg-red-500"
        >
          <span>{error}</span>
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ManageBusinesses;

const BusinessTable = ({ data, deleteBusiness, blockBusiness, open }) => {
  const [orderBy, setOrderBy] = useState("createdAt"); // Initial sort order by createdAt
  const [order, setOrder] = useState("asc"); // Initial sort direction

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      case "createdAt":
        return order === "asc"
          ? moment
              .utc(a.createdAt)
              .local()
              .diff(moment.utc(b.createdAt).local())
          : moment
              .utc(b.createdAt)
              .local()
              .diff(moment.utc(a.createdAt).local());
      case "blockTimeStamp":
        return order === "asc"
          ? moment
              .utc(a.blockTimeStamp)
              .local()
              .diff(moment.utc(b.blockTimeStamp).local())
          : moment
              .utc(b.blockTimeStamp)
              .local()
              .diff(moment.utc(a.blockTimeStamp).local());
      case "block":
        return order === "asc"
          ? (a.block ? 1 : 0) - (b.block ? 1 : 0)
          : (b.block ? 1 : 0) - (a.block ? 1 : 0);
      case "name":
        const nameA = `${a.businessName}`;
        const nameB = `${b.businessName}`;
        return order === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      case "email":
        return order === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      case "businessCategory":
        return order === "asc"
          ? a.businessCategory.localeCompare(b.businessCategory)
          : b.businessCategory.localeCompare(a.businessCategory);
      case "overallRating":
        return order === "asc"
          ? a.overallRating - b.overallRating
          : b.overallRating - a.overallRating;
      default:
        return 0;
    }
  });

  console.log(sortedData, "sortedData");
  const tableWidth = open ? "tw-w-[62rem]" : "tw-w-[73rem]";

  return (
    <div className={`${tableWidth} tw-mt-9 tw-overflow-x-scroll tw-mx-auto`}>
      <TableContainer className="tw-overflow-x-auto tw-shadow-md reviews-table tw-w-[100rem]">
        <Table stickyHeader className="tw-text-left tw-text-sm">
          <TableHead>
            <TableRow className="header-cell-div">
              <TableCell
                key="name"
                sortDirection={orderBy === "name" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "name")}
                  className="header-cell tw-text-base"
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="email"
                sortDirection={orderBy === "email" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "email")}
                  className="header-cell tw-text-base"
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="createdAt"
                sortDirection={orderBy === "createdAt" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "createdAt"}
                  direction={orderBy === "createdAt" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "createdAt")}
                  className="header-cell tw-text-base"
                >
                  Signed Up
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="blockTimeStamp"
                sortDirection={orderBy === "blockTimeStamp" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "blockTimeStamp"}
                  direction={orderBy === "blockTimeStamp" ? order : "asc"}
                  onClick={(event) =>
                    handleRequestSort(event, "blockTimeStamp")
                  }
                  className="header-cell tw-text-base"
                >
                  Last Blocked
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="block"
                sortDirection={orderBy === "block" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "block"}
                  direction={orderBy === "block" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "block")}
                  className="header-cell tw-text-base"
                >
                  Block Status
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="category"
                sortDirection={orderBy === "businessCategory" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "businessCategory"}
                  direction={orderBy === "businessCategory" ? order : "asc"}
                  onClick={(event) =>
                    handleRequestSort(event, "businessCategory")
                  }
                  className="header-cell tw-text-base"
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="rating"
                sortDirection={orderBy === "overallRating" ? order : false}
                className="header-cell-div"
              >
                <TableSortLabel
                  active={orderBy === "overallRating"}
                  direction={orderBy === "overallRating" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "overallRating")}
                  className="header-cell tw-text-base"
                >
                  Rating
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="block"
                sortDirection={orderBy === "block" ? order : false}
                className="header-cell-div"
              >
                <Box className="header-cell tw-text-base">Actions</Box>
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
              <TableRow key={row._id}>
                <TableCell className="tw-py-3 tw-px-4">
                  {`${row.businessName}`}
                </TableCell>
                <TableCell className="tw-py-3 tw-px-4">{row.email}</TableCell>
                <TableCell className="tw-py-3 tw-px-4">
                  {moment.utc(row.createdAt).local().format("MM/DD/YYYY")}
                </TableCell>
                <TableCell className="tw-py-3 tw-px-4">
                  {row.blockTimeStamp
                    ? moment
                        .utc(row.blockTimeStamp)
                        .local()
                        .format("MM/DD/YYYY")
                    : "-"}
                </TableCell>
                <TableCell className="tw-py-3 tw-px-4">
                  <Chip
                    label={
                      <Typography className="tw-text-xs">
                        {row.block ? "Blocked" : "Active"}
                      </Typography>
                    }
                    className={
                      row.block
                        ? "tw-bg-red-500 tw-text-white"
                        : "tw-bg-green-500 tw-text-white"
                    }
                  />
                </TableCell>
                <TableCell className="tw-py-3 tw-px-4">
                  {row.businessCategory}
                </TableCell>
                <TableCell className="tw-py-3 tw-px-4">
                  {row.overallRating}
                </TableCell>
                <TableCell className="tw-py-3 tw-px-2">
                  <Box>
                    <IconButton
                      aria-label="delete"
                      className="tw-text-red-500"
                      onClick={() => deleteBusiness(row._id)}
                    >
                      <Tooltip title="Delete">
                        <Delete />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      aria-label="block"
                      className="tw-text-yellow-500"
                      onClick={() => blockBusiness(row)}
                    >
                      {row.block ? (
                        <Tooltip title="Unblock ">
                          <LockOpen />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Block">
                          <Block />
                        </Tooltip>
                      )}
                    </IconButton>
                  </Box>
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
                rowsPerPageOptions={[5, 15, 25, { label: "All", value: -1 }]}
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
