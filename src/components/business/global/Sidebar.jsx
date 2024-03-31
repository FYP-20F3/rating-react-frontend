import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { Reviews } from "@mui/icons-material";

export default function Sidebar({
  handleDrawerClose,
  open,
  drawerWidth,
  DrawerHeader,
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const CARD_PROPERTY = {
    borderRadius: 3,
    boxShadow: 0,
    bgcolor: grey[200],
    mx: 1.4,
  };
  const handleDashboard = () => {
    navigate("/business/dashboard");
  }
  const handleReviews = () => {
    navigate("/business/reviews");
  }
  const handleAnalysis = () => {
    navigate("/business/reviews/analysis");
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: ".3px dotted",
          borderColor: grey[400],
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ArrowCircleLeftIcon />
          ) : (
            <ArrowCircleRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Card sx={CARD_PROPERTY}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="square"
              sx={{ bgcolor: "primary.main", width: 65, height: 65, mr: 2 }}
              src="https://randomuser.me/api/portraits/women/47.jpg"
            >
              G
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Oriana
            </Typography>
          </Box>
        </Box>
      </Card>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText
              onClick={handleDashboard}
              primary={"Dashboard"}
              sx={{ fontSize: "body4.fontSize" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Reviews sx={{ mr: 2, verticalAlign: "middle" }} />
            </ListItemIcon>
            <ListItemText
              onClick={handleReviews}

              primary={"Reviews"}
              sx={{ fontSize: "body4.fontSize" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Reviews sx={{ mr: 2, verticalAlign: "middle" }} />
            </ListItemIcon>
            <ListItemText
              onClick={handleAnalysis}

              primary={"Analysis"}
              sx={{ fontSize: "body4.fontSize" }}
            />
          </ListItemButton>
        </ListItem>
        {/* <Accordion
          sx={{
            boxShadow: "none",
            // pl: 1,
            ml: 2,
            alignItems: "flex-center",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              "& .MuiAccordionSummary-content": {
                // Target specific element
                alignItems: "center",
              },
            }}
          >
            <Reviews sx={{ mr: 2, verticalAlign: "middle" }} />
            <Typography variant="h6" sx={{}}>
              Manage Reviews
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button sx={{ display: "block", width: "100%" }}>
              Service Reviews
            </Button>

            <Button sx={{ display: "block", width: "100%" }}>
              Service Reviews
            </Button>

            <Button sx={{ display: "block", width: "100%" }}>
              Service Reviews
            </Button>
          </AccordionDetails>
        </Accordion> */}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
