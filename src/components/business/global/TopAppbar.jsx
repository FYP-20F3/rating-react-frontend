import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout, Chat } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { signOut } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const TopAppbar = ({
  open,
  drawerWidth,
  handleDrawerOpen,
  from = "business",
}) => {
  const Appbar = styled(Box, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    backgroundColor: theme.palette.background.offWhite,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    minWidth: "100%",
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Appbar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
            className={open ? `tw-w-[78%]` : `tw-w-[97%]`}
          >
            {from === "business" && (
              <Button
                variant="text"
                startIcon={<Chat className="tw-text-orange-500" />}
                className="tw-text-orange-500 tw-text-base"
                onClick={() => navigate("/business/chat")}
              >
                Chat
              </Button>
            )}
            <Button
              variant="text"
              endIcon={<Logout />}
              className="tw-text-base"
              onClick={() => dispatch(signOut())}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Appbar>
    </>
  );
};

export default TopAppbar;
