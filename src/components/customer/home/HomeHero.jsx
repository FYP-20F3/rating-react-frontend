import { Grid, Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";
import Icon1 from "../../../assets/jpg/reviewIllustration.png";
import SearchTextField from "../common/SearchTextField";
import { useNavigate } from "react-router-dom";
import { useSearchName } from "../../../context/SearchNameContext";
import { set } from "react-hook-form";

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
  const widthSpacing = {
    width: { xs: "92%", sm: "78%", md: "80%" },
  };
  const navigate = useNavigate();

  const paddingSpacing = {
    paddingNormal: {
      tb: 1,
      rl: 5,
    },
    paddingSm: {
      tb: 0.5,
      rl: 2.7,
    },
  };

  const handleSearch = (event) => {
    set(event.target.value);
    navigate("/customer/category/all");
  };

  console.log(paddingSpacing);
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
          <SearchTextField
            wSpacing={widthSpacing.width}
            mSpacing={2}
            hSpacing={3}
            pNormalSpacing={paddingSpacing.paddingNormal}
            pSmallSpacing={paddingSpacing.paddingSm}
            handleSearch={handleSearch}
          />
          {/* {loading && <p>Loading results...</p>}

          {results.length > 0 && (
            <ul>
              {results.map(result => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          )}

          {results.length === 0 && !loading && <p>No results found.</p>} */}
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
