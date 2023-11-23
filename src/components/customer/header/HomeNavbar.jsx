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
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  MenuList,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import LogoBox from "./LogoBox";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const drawerWidth = 240;
const navItems = ["Reviews", "Complaints", "Surveys"];

export default function HomeNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center"}}>
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
        <Toolbar sx={{ mr: {xs: 2, md: 4}, ml: {xs: 2, md: 5} }}>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",           
              mr: 1.4,
              ml: {xs: "auto", md:0},
            }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                disableRipple
              >
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    mr: 0.6,
                    
                    bgcolor: "primary.light",
                    color: "white",
                  }}
                />
                <Typography
                  variant="body3"
                  sx={{
                    color: "primary.light",
                    fontWeight: "600",
                    display: { xs: "none", md: "inline-block" },
                  }}
                >
                  Profile
                </Typography>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            sx={{
              mt: 1.4,
              "& .MuiMenu-list": {
                bgcolor: "white",
                px: 1,
                py: 1,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <Typography
                variant="body3"
                sx={{
                  color: "text.primary",
                }}
              >
                Settings
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography
                variant="body3"
                sx={{
                  color: "text.primary",
                }}
              >
                Logout
              </Typography>
            </MenuItem>
          </Menu>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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
              height: "30vh",
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
