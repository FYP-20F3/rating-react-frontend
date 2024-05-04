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
import moment from "moment/moment";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}customers/`);
      setCustomers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const deleteCustomer = async (customerId) => {
    console.log(customerId, "customerId");

    try {
      console.log(`${BASE_URL}customers/${customerId}`);
      const response = await axios.delete(`${BASE_URL}customers/${customerId}`);
      console.log("response:", response);

      if (response.status === 200) {
        console.log(`${response.data.msg}`);
        setError(`${response.data.msg}`);
        setOpen(true);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
      setOpen(true);
    }
  };

  const blockCustomer = async (customer) => {
    let customerId = customer._id;

    let block = "block";

    if (customer.block === true) {
      block = "unblock";
    }

    try {
      console.log(`${BASE_URL}customers/${customerId}/block`);
      const response = await axios.put(
        `${BASE_URL}customers/${customerId}/block`,
        {
          action: block,
        }
      );
      console.log("response:", response);

      if (response.status === 200) {
        setError(`${response.data.msg}`);
        setOpen(true);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
      setOpen(true);
    }
  };

  return (
    <div
      className={customers.length === 0 ? "tw-h-[90vh] tw-mb-10" : "tw-mb-10"}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 5, ml: 2 }}>
        <Box
          component="img"
          src="../../../src/assets/manage_customer.png"
          alt="Manage Customers"
          className="tw-w-24 tw-h-24"
        />
        <Box>
          <Typography
            variant="h5"
            className="tw-font-semibold tw-text-orange-500 tw-mb-2"
          >
            Customer Management Hub
          </Typography>
          <Typography className="tw-font-medium tw-text-[15px]  tw-mb-3 ">
            Command your customer database with precision.
          </Typography>
        </Box>
      </Box>
      <CustomerTable
        data={customers}
        deleteCustomer={deleteCustomer}
        blockCustomer={blockCustomer}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
export default ManageCustomers;

const CustomerTable = ({ data, deleteCustomer, blockCustomer }) => {
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
          ? moment(a.createdAt).diff(moment(b.createdAt))
          : moment(b.createdAt).diff(moment(a.createdAt));
      case "blockTimeStamp":
        return order === "asc"
          ? moment(a.blockTimeStamp).diff(moment(b.blockTimeStamp))
          : moment(b.blockTimeStamp).diff(moment(a.blockTimeStamp));
      case "block":
        return order === "asc"
          ? (a.block ? 1 : 0) - (b.block ? 1 : 0)
          : (b.block ? 1 : 0) - (a.block ? 1 : 0);
      case "name":
        const nameA = `${a.firstName} ${a.lastName}`;
        const nameB = `${b.firstName} ${b.lastName}`;
        return order === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      case "email":
        return order === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      default:
        return 0;
    }
  });

  return (
    <div className="tw-w-full tw-mt-9">
      <TableContainer className="tw-overflow-x-auto tw-shadow-md reviews-table">
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
                  Block Time
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
                  {`${row.firstName} ${row.lastName}`}
                </TableCell>
                <TableCell className="tw-py-3 tw-px-4">{row.email}</TableCell>
                <TableCell className="tw-py-3 tw-px-4">
                  {moment(row.createdAt).format("MM/DD/YYYY")}
                </TableCell>
                <TableCell className="tw-py-3 tw-px-4">
                  {row.blockTimeStamp
                    ? moment(row.blockTimeStamp).format("MM/DD/YYYY")
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
                <TableCell className="tw-py-3 tw-px-2">
                  <Box>
                    <IconButton
                      aria-label="delete"
                      className="tw-text-red-500"
                      onClick={() => deleteCustomer(row._id)}
                    >
                      <Tooltip title="Delete">
                        <Delete />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      aria-label="block"
                      className="tw-text-yellow-500"
                      onClick={() => blockCustomer(row)}
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
