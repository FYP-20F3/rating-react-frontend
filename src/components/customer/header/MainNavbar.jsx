import {
  Typography,
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Divider,
  Toolbar,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import LogoBox from "./LogoBox";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Features", "Why us", "Reviews"];

export default function MainNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Button
        color="primary"
        variant="contained"
        sx={{ my: 2 }}
        onClick={() => navigate("/business/register")}
      >
        For Business
      </Button>
      <Divider />
      <Link to="/customer/login">
        <Button sx={{ color: "primary.main", mt: 2 }}>Login</Button>
      </Link>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={<Typography variant="body3">{item}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="background"
        variant="outline"
        sx={{ display: "flex" }}
      >
        <Toolbar sx={{ ml: 5 }}>
          <LogoBox />
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              ml: "auto",
              mr: "auto",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "text.primary", mr: 4 }}
                variant="body2"
              >
                {item}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ml: "auto", display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link to="/customer/login">
              <Button sx={{ color: "primary.main" }}>Login</Button>
            </Link>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                navigate("/business/login");
              }}
            >
              For Business
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "55vh",
              top: "10rem",
              borderRadius: ".9rem",
              left: ".4rem",
              bgcolor: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
