import React from "react";
import {
  Stack,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/system";
import Icon1 from "../../../assets/jpg/exploreIcon1.jpg";
import Icon2 from "../../../assets/jpg/exploreIcon2.jpg";
import Icon3 from "../../../assets/jpg/exploreIcon3.jpg";
import Icon4 from "../../../assets/jpg/exploreIcon4.jpg";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const StyledGridInner = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const StyledImage = styled("img")(({ theme }) => ({
  mixBlendMode: "darken",
  marginRight: "15px",
}));

const Explore = () => {
  return (
    <Stack spacing={3} sx={{ pl: { xs: 1, md: 4 } }}>
      <Typography variant="h3" sx={{ pl: 4.5 }}>
        Explore Categories
      </Typography>
      <Grid container spacing={2}>
        <StyledGridInner item xs={11} sm={5.5} md={5} lg={2.7}>
          <CardActionArea sx={{ px: { xs: 3, sm: 0 }, width: { xs: "400" } }}>
            <StyledCard>
              <StyledCardContent>
                <StyledImage src={Icon1} width={23} />
                <Typography variant="body3">
                  <Link to="/home/category/electronics-tech">
                    Electronics & Tech
                  </Link>
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </CardActionArea>
        </StyledGridInner>
        <StyledGridInner item xs={11} sm={5.5} md={5} lg={2.7}>
          <CardActionArea sx={{ px: { xs: 3, sm: 0 }, width: { xs: "400" } }}>
            <StyledCard>
              <StyledCardContent>
                <StyledImage src={Icon2} width={23} />
                <Typography variant="body3">
                  <Link to="/home/category/clothing">Clothing Store</Link>
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </CardActionArea>
        </StyledGridInner>
        <StyledGridInner item xs={11} sm={5.5} md={5} lg={2.7}>
          <CardActionArea sx={{ px: { xs: 3, sm: 0 }, width: { xs: "400" } }}>
            <StyledCard>
              <StyledCardContent>
                <StyledImage src={Icon3} width={23} />
                <Typography variant="body3">
                  <Link to="/home/category/cosmetics">Cosmetics</Link>
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </CardActionArea>
        </StyledGridInner>
        <StyledGridInner item xs={11} sm={5.5} md={5} lg={2.7}>
          <CardActionArea sx={{ px: { xs: 3, sm: 0 }, width: { xs: "400" } }}>
            <StyledCard>
              <StyledCardContent>
                <StyledImage src={Icon4} width={23} />
                <Typography variant="body3">
                  <Link to="/home/category/food">Food</Link>
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </CardActionArea>
        </StyledGridInner>
      </Grid>
    </Stack>
  );
};

export default Explore;
