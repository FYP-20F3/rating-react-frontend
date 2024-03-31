import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Card,
  Avatar,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import {
  Reviews,
  ArrowCircleLeft,
  ArrowCircleRight,
  AutoGraph,
  Dashboard,
  Logout,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../redux/userSlice";


export default function Sidebar({
  handleDrawerClose,
  open,
  drawerWidth,
  DrawerHeader,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const CARD_PROPERTY = {
    borderRadius: 3,
    boxShadow: 0,
    bgcolor: grey[200],
    mx: 1.34,
  };
  const handleDashboard = () => {
    navigate("/business/dashboard");
  };
  const handleReviews = () => {
    navigate("/business/reviews");
  };
  const handleAnalysis = () => {
    navigate("/business/reviews/analysis");
  };
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
            <ArrowCircleLeft />
          ) : (
            <ArrowCircleRight />
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
              src={currentUser?.businessLogoPath}
            >
              G
            </Avatar>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold" }}
                color="primary"
              >
                {currentUser?.businessName}
              </Typography>
              <Typography
                variant="body3"
                sx={{ fontWeight: "bold" }}
                color="text.secondary"
              >
                {currentUser?.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
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
              <AutoGraph sx={{ mr: 2, verticalAlign: "middle" }} />
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
      <Divider sx={{ mt: 15 }} />
      <List>
        <ListItem >
          <ListItemButton>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ mr: 2, verticalAlign: "middle" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Logout"}
              sx={{ fontSize: "body4.fontSize" }}
              onClick={() => dispatch(signOut())}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
