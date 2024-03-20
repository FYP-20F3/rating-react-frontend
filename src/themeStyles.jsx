import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF4F", // Primary color
      contrastText: "#fff",
    },
    secondary: {
      main: "#263238", // Secondary color
    },
    info: {
      main: "#2194F3", // Info color
    },
    text: {
      primary: "#4D4D4D", // Neutral Grey for text
      secondary: "#717171", // Neutral Grey for secondary text
      tertiary: "#FFFFFF", // White text color for tertiary
    },
    background: {
      default: "#FFFFFF", // Neutral White for default background
      paper: "#F5F7FA", // Neutral Silver for paper background
    },
    box: {
      green: "#00B67A",
      lime: "#73CF11",
      yellow: "#FFCE00",
      orange: "#eb8524",
      red: "#E6312D",
      default: "#DCDCE6",
    },
  },
  typography: {
    fontFamily: "Public Sans, sans-serif", // Custom font family
    allVariants: {
      textTransform: "none",
    },
    fontSize: 13,
    h1: {
      fontWeight: "600", // Semi-bold
      fontSize: "2.6rem",
      lineHeight: "3.6rem",
      letterSpacing: ".1rem",
    },
    h2: {
      fontWeight: "600", // Semi-bold
      fontSize: "1.7rem",
      lineHeight: "2.3rem",
      letterSpacing: ".02rem",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      lineHeight: "1.7rem",
      letterSpacing: ".08rem",
    },
    h4: {
      fontWeight: "600", // Semi-bold
      fontSize: "1rem",
      lineHeight: "1.3rem",
      letterSpacing: ".04rem",
    },
    body1: {
      fontWeight: "400",
      fontSize: "1.1rem",
      lineHeight: "2rem",
    },
    body2: {
      fontWeight: "400",
      fontSize: "1.05rem",
      lineHeight: "1.71rem",
    },
    body3: {
      fontWeight: "400",
      fontSize: ".9rem",
      lineHeight: "1.43rem",
    },
    body4: {
      fontWeight: "400",
      fontSize: "0.86rem",
      lineHeight: "1rem",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
