import { useState } from "react";
import TopAppbar from "../../../components/business/global/TopAppbar";
import { Outlet } from "react-router-dom";
import { Box, styled } from "@mui/material";
import { businessLoginPath } from "../../../const/path";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/global/AdminSidebar";
import {
  OpenStateProvider,
  useOpenState,
} from "../../../context/AdminOpenContext";

const drawerWidth = 285;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    display: "block",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AdminDashboard = () => {
  const { open, setOpen } = useOpenState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to={businessLoginPath} />;
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "background.paper" }}>
      <TopAppbar
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
      />
      <AdminSidebar
        handleDrawerClose={handleDrawerClose}
        open={open}
        drawerWidth={drawerWidth}
        DrawerHeader={DrawerHeader}
      />
      <Main open={open} className={`tw-mt-10 ${open ? "tw-pl-6" : "tw-pl-14"}`}>
          {/* <DrawerHeader /> */}
          <Outlet />
      </Main>
    </Box>
  );
};

export default AdminDashboard;
