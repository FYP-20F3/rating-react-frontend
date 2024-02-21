import React from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Grid,
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
import { useNavigate } from "react-router-dom";
import { getData } from "../../../store/apiData";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
  const navigate = useNavigate();
  const { respdata } = useSelector((state) => state.respdata);

  const handleCosmetics = () => {
    navigate("/customer/home/category/cosmetics");
  };
  return (
    <Stack spacing={3} sx={{ pl: { xs: 1, md: 4 } }}>
      <Typography variant="h3" sx={{ pl: 4.5 }}>
        Explore Categories
      </Typography>
      <Grid container spacing={2}>
        <StyledGridInner item xs={11} sm={5.5} md={5} lg={2.7}>
          <CardActionArea sx={{ px: { xs: 3, sm: 0 }, width: { xs: "400" } }}>
            <StyledCard
              onClick={() => {
                navigate("/customer/home/category/electronics-tech");
              }}
            >
              <StyledCardContent>
                <StyledImage src={Icon1} width={23} />
                <Typography variant="body3">Electronics & Tech</Typography>
              </StyledCardContent>
            </StyledCard>
          </CardActionArea>
        </StyledGridInner>
        <StyledGridInner item xs={11} sm={5.5} md={5} lg={2.7}>
          <CardActionArea sx={{ px: { xs: 3, sm: 0 }, width: { xs: "400" } }}>
            <StyledCard
              onClick={() => {
                navigate("/customer/home/category/clothing");
              }}
            >
              <StyledCardContent>
                <StyledImage src={Icon2} width={23} />
                <Typography variant="body3">Clothing Store</Typography>
              </StyledCardContent>
            </StyledCard>
          </CardActionArea>
        </StyledGridInner>
        <StyledGridInner item xs={11} sm={5.5} md={5} lg={2.7}>
          <CardActionArea sx={{ px: { xs: 3, sm: 0 }, width: { xs: "400" } }}>
            <StyledCard onClick={handleCosmetics}>
              <StyledCardContent>
                <StyledImage src={Icon3} width={23} />
                <Typography variant="body3">Cosmetics</Typography>
              </StyledCardContent>
            </StyledCard>
          </CardActionArea>
        </StyledGridInner>
        <StyledGridInner item xs={11} sm={5.5} md={5} lg={2.7}>
          <CardActionArea sx={{ px: { xs: 3, sm: 0 }, width: { xs: "400" } }}>
            <StyledCard
              onClick={() => {
                navigate("/customer/home/category/food");
              }}
            >
              <StyledCardContent>
                <StyledImage src={Icon4} width={23} />
                <Typography variant="body3">Food</Typography>
              </StyledCardContent>
            </StyledCard>
          </CardActionArea>
        </StyledGridInner>
      </Grid>
    </Stack>
  );
};

export default Explore;
