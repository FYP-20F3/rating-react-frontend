import React from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import Icon1 from "../../../assets/jpg/reviewIllustration.png";

const StyledGrid = styled(Grid)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(21),
  position: "relative",
  top: "6rem",
  overflow: "hidden",
}));

const StyledGridInner = styled(Grid)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: { paddingLeft: theme.spacing(10) },
  [theme.breakpoints.down("md")]: { paddingLeft: theme.spacing(9) },
  [theme.breakpoints.down("sm")]: { paddingLeft: theme.spacing(2.5) },
  [theme.breakpoints.down("xs")]: { paddingLeft: theme.spacing(1) },
  paddingTop: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiInputBase-input": {
    paddingLeft: theme.spacing(1),
    height: theme.spacing(3), // Default height
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(1), // Reduced height for smaller screens
    },
    fontSize: theme.typography.body1.fontSize, // Default font size for larger screens
    [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem', // Smaller placeholder font size for smaller screens
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 5),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(.5, 2.7),
  },
  borderRadius: "27px",
  cursor: "pointer",
  fontSize: theme.typography.body1.fontSize, // Default font size for larger screens
    [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem', // Smaller placeholder font size for smaller screens
    },
}));

const StyledImage = styled("img")(({ theme }) => ({
  width: 400,
  height: 400,
  [theme.breakpoints.down("sm")]: {
    width: 280,
    height: 280,
    marginTop: "1.3rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "1.3rem",
  },
  margin: "0 auto",
  display: "block",
}));

const HomeHero = () => {
  return (
    <StyledGrid container>
      <StyledGridInner item xs={12} md={6}>
        <Box>
          <StyledTypography
            variant="h1"
            sx={{
              fontSize: {
                xs: "1.9rem",
                sm: "2.1rem",
                md: "2.7rem",
                lg: "3.2rem",
              },
              lineHeight: { xs: "2.6rem", md: "3.4rem" },
              width: { xs: "96%", sm: "60%", md: 403 },
            }}
          >
            Read and Write reviews Find companies you can trust-
          </StyledTypography>
          <Divider
            sx={{
              width: { xs: "84%", sm: "78%", md: 440 },
              mt: 4,
              mb: 7,
              border: 2,
              borderColor: "#323842",
            }}
          />
          <StyledTextField
            hiddenLabel
            variant="outlined"
            placeholder="Search Company by name"
            size="medium"
            InputProps={{
              startAdornment: <SearchIcon />,
              endAdornment: <StyledButton variant="contained">Search</StyledButton>,
              style: {
                borderRadius: "30px",
              },
            }}
            sx={{
              width: { xs: "92%", sm: "78%", md: 470 },
            }}
          />
        </Box>
      </StyledGridInner>
      <StyledGridInner item xs={12} md={6}>
        <Box>
          <StyledImage src={Icon1} alt="illustration" />
        </Box>
      </StyledGridInner>
    </StyledGrid>
  );
};

export default HomeHero;
