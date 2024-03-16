import {
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
  Box,
  Avatar,
  Card,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import Icon1 from "../../../assets/jpg/info.jpg";
import { styled } from "@mui/system";

const StyledImage = styled("img")(({ theme }) => ({
  mixBlendMode: "darken",
  width: "22px",
  height: "22px",
}));

const InfoHero = () => {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <Grid
      container
      spacing={0.4}
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 2,
        px: 18,
      }}
    >
      <Grid item xs={12} md={7}>
        <Card elevation={0}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="profile"
                variant="square"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  width: { xs: "90px", md: "140px" },
                  height: { xs: "90px", md: "140px" },
                  borderRadius: 1,
                  mt: { xs: 0, md: 1 },
                  mr: { xs: 0, md: 1 },
                }}
              >
                BN
              </Avatar>
            }
            title={
              <Stack>
                <Typography
                  variant="h2"
                  sx={{
                    marginBottom: ".9rem !important",
                    color: "text.primary",
                    mt: 1,
                  }}
                >
                  Business Name
                </Typography>
                <Grid container>
                  {ratings.map((rating) => (
                    <Grid item key={rating}>
                      <Avatar
                        aria-label="star box"
                        variant="square"
                        sx={{
                          bgcolor: "box.green",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: { xs: "15px", sm: "28px" },
                          width: { xs: "15px", sm: "28px" },
                          marginRight: "1px",
                        }}
                      >
                        <StarRateIcon
                          sx={{
                            color: "white",
                            height: { xs: "15px", sm: "32px" },
                            width: { xs: "15px", sm: "32px" },
                          }}
                        />
                      </Avatar>
                    </Grid>
                  ))}
                  <Grid item sx={{ display: "flex" }}>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        ml: { xs: 0.3, sm: 1, lg: 2.3 },
                        color: "text.secondary",
                        fontWeight: "bold",
                      }}
                    >
                      4.7
                    </Typography>
                    <Divider
                      orientation="vertical"
                      sx={{
                        borderWidth: 1,
                        ml: 1,
                        mr: 1,
                        mt: { xs: 0.5, md: 0 },
                        height: { xs: "80%", sm: "70%", md: "90%" },
                      }}
                    />
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        ml: { xs: 0.5, md: 2 },
                        color: "text.secondary",
                        fontWeight: "bold",
                      }}
                    >
                      3,4555 reviews
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            }
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={4} className="ml-auto mt-7">
        <Box
          className="mt-2 rounded-md border-indigo-600 p-2"
          sx={{ border: "2px solid" }}
        >
          <Typography variant="h3" component="h2" className="text-blue-800">
            www.dummywebsite.com
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{
              color: "text.secondary",
            }}
          >
            Visit this website
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
export default InfoHero;
