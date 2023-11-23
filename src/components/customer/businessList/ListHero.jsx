import React from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  "& .MuiInputBase-input": {
    paddingLeft: theme.spacing(1),
    height: theme.spacing(2.7), // Default height
    [theme.breakpoints.down("sm")]: {
      height: theme.spacing(1), // Reduced height for smaller screens
    },
    fontSize: theme.typography.body1.fontSize, // Default font size for larger screens
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem", // Smaller placeholder font size for smaller screens
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.6, 4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5, 2),
  },
  borderRadius: "27px",
  cursor: "pointer",
  fontSize: theme.typography.body1.fontSize, // Default font size for larger screens
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem", // Smaller placeholder font size for smaller screens
  },
}));

const ListHero = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
        pt: 17,
        pb: 8,
      }}
    >
      <Typography variant="h2" align="center" sx={{}}>
        Businesses List In{" "}
        <Typography variant="h2" align="center" color="primary">
          Electronics & Technology
        </Typography>
      </Typography>
      <Stack sx={{ marginTop: "2.5rem" }}>
        <StyledTextField
          hiddenLabel
          variant="outlined"
          placeholder="Search Company by name"
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: (
              <StyledButton variant="contained">Search</StyledButton>
            ),
            style: {
              borderRadius: "30px",
              backgroundColor: "white",
            },
          }}
          sx={{
            width: { md: 570 },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default ListHero;
