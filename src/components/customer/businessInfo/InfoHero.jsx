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
import { styled } from "@mui/system";

const StyledImage = styled("img")(({ theme }) => ({
  width: "120px",
  height: "120px",
  borderRadius: 1,
  mt: 1,
  mr: 1,
  [theme.breakpoints.down("md")]: {
    mt: 0,
    mr: 0,
    width: "90px",
    height: "90px",
  },
}));

const InfoHero = ({ data }) => {
  const ratings = [1, 2, 3, 4, 5];

  let overallRating = 0;
  if (data.overallRating) {
    const averageRating = data.overallRating;
    overallRating = parseFloat(averageRating.toFixed(0));
  }
  console.log(overallRating, "data");

  // console.log(data, "data");
  // console.log(data.length > 0 ? data.businessLogoPath: "ok", data.length > 0, "data.businessLogoPath");

  const handleClick = () => {
    window.open(data.websiteAddress, "_blank");
    // window.open("https://www.google.com.pk/?gws_rd=ssl", "_blank");
  };

  return (
    <Grid
      container
      spacing={0.4}
      sx={{
        bgcolor: "background.paper",
        pt: 10,
        pb: 2,
        px: 18,
      }}
    >
      <Grid item xs={12} md={7}>
        <Card elevation={0}>
          <CardHeader
            avatar={
              data ? (
                <StyledImage src={data.businessLogoPath} />
              ) : (
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
              )
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
                  {data.businessName}
                </Typography>
                <Grid container>
                  {ratings.map((rating) => (
                    <Grid item key={rating}>
                      <Avatar
                        aria-label="star box"
                        variant="square"
                        sx={{
                          bgcolor:
                            rating == 1 && overallRating == 1
                              ? "box.red"
                              : rating <= 2 && overallRating == 2
                              ? "box.orange"
                              : rating <= 3 && overallRating == 3
                              ? "box.yellow"
                              : rating <= 4 && overallRating == 4
                              ? "box.lime"
                              : rating <= 5 && overallRating == 5
                              ? "box.green"
                              : "box.default",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: { xs: "15px", sm: "25px" },
                          width: { xs: "15px", sm: "25px" },
                          marginRight: "1px",
                        }}
                      >
                        <StarRateIcon
                          sx={{
                            color: "white",
                            height: { xs: "15px", sm: "25px" },
                            width: { xs: "15px", sm: "25px" },
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
                      {data.overallRating}
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
                      {data.reviewCount} reviews
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
          className="tw-mt-2 tw-rounded-md tw-border-indigo-600 tw-p-2"
          sx={{
            border: "2px solid",
            "&:hover": {
              boxShadow: 4, // Enhance box shadow on hover
            },
          }}
        
          onClick={handleClick}
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
