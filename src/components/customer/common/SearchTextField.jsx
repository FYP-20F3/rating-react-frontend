import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import { TextField, Button } from "@mui/material";
import { useSearchName } from "../../../context/SearchNameContext";

const SearchTextField = ({
  mSpacing,
  hSpacing,
  wSpacing,
  pNormalSpacing,
  pSmallSpacing,
  handleSearch,
  handleSearchButton,
}) => {
  const { searchName } = useSearchName();

  const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(mSpacing),
    "& .MuiInputBase-input": {
      paddingLeft: theme.spacing(1),
      height: theme.spacing(hSpacing), // Default height
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
    padding: theme.spacing(pNormalSpacing.tb, pNormalSpacing.rl),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(pSmallSpacing.tb, pSmallSpacing.rl),
    },
    borderRadius: "27px",
    cursor: "pointer",
    fontSize: theme.typography.body1.fontSize, // Default font size for larger screens
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem", // Smaller placeholder font size for smaller screens
    },
  }));

  return (
    <StyledTextField
      hiddenLabel
      variant="outlined"
      value={searchName}
      onChange={handleSearch}
      placeholder="Search Company by name"
      size="medium"
      InputProps={{
        startAdornment: <SearchIcon />,
        endAdornment: (
          <StyledButton variant="contained" onClick={handleSearchButton}>
            Search
          </StyledButton>
        ),
        style: {
          borderRadius: "30px",
          backgroundColor: "white",
        },
      }}
      sx={{
        width: wSpacing,
      }}
      autoFocus
    />
  );
};
export default SearchTextField;
