import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Box,
  Container,
  Typography,
  Avatar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../const/APIS";
import { toast } from "react-hot-toast";

const BusinessSettings = () => {
  const { register, handleSubmit, setValue, control } = useForm();
//   const [businessLogoURL, setBusinessLogoURL] = useState(null);

  const cities = [
    "Karachi",
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Hyderabad",
    "Islamabad",
    "Quetta",
    "Bahawalpur",
    "Sargodha",
    "Sialkot",
    "Sukkur",
    "Rahim Yar Khan",
    "Sheikhupura",
    "Peshawar",
    "Gujrat",
    "Mardan",
    "Wah Cantt",
    "Daska",
    "Dera Ismail Khan",
    "Sahiwal",
    "Okara",
    "Chiniot",
    "Jhang",
    "Campbellpur",
    "Kasur",
    "Nowshera",
    "Abbottabad",
    "Bannu",
    "Hafizabad",
    "Sukheke",
    "Gojra",
    "Samundri",
    "Kohat",
    "Jhelum",
    "Sadiqabad",
    "Bhakkar",
    "Layyah",
    "Mandi Bahauddin",
    "Toba Tek Singh",
    "Vehari",
    "Faisalabad Saddar",
    "Raiwind",
    "Chakwal",
    "Dera Ghazi Khan",
    "Narowal",
    "Khanewal",
    "Mianwali",
    "Lodhran",
    "Attock",
    "Muzaffargarh",
    "Khanpur",
    "Taxila",
    "Gujar Khan",
  ];
  const [businessData, setBusinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  const businessId = currentUser?._id;

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 150,
        overflowY: "auto",
      },
    },
  };

  //   const handleImageUpload = async (event) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setBusinessLogoURL(reader.result);
  //     };
  //   };

  const fetchBusinessDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}businesses/${businessId}`);
      setBusinessData(response.data);
      setValue("businessName", response.data.businessName);
      setValue("businessDescription", response.data.businessDescription);
      setValue("location", response.data.location);
      //   setBusinessLogoURL(response.data.businessLogoPath);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching business details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, [businessId]);

  const onSubmit = async (data) => {
    const hasChanges =
      data.businessName !== businessData.businessName ||
      data.businessDescription !== businessData.businessDescription ||
      data.location !== businessData.location ||
      //   businessLogoURL !== businessData.businessLogoPath ||
      data.password;

    console.log(hasChanges);
    console.log(data, businessData);
    // console.log(businessLogoURL);

    if (!hasChanges) {
      toast.error("Please change the fields to update the information.");
      return;
    }

    if (!data.businessName || !data.businessDescription || !data.location) {
      toast.error("Empty fields data can't be send.");
      return;
    }

    try {
      const requestData = {
        // If businessLogoURL exists, it means a new image was uploaded
        // file:
        //   businessLogoURL && businessLogoURL !== businessData.businessLogoPath
        //     ? businessLogoURL.split(",")[1]
        //     : undefined,
        businessName: data.businessName || businessData.businessName,
        businessDescription: data.businessDescription,
        location: data.location,
        password: data.password,
      };

      console.log(requestData);

      const response = await axios.post(
        `${BASE_URL}businesses/edit/${businessId}`,
        requestData
      );

      if (response.status === 201) {
        toast.error(response.data.msg);
      } else {
        toast.success(response.data.msg);
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error updating business information:", error);
      toast.error("Failed to update business information. Please try again.");
    }
  };

  return (
    <Container className={isLoading && "tw-h-[83vh]"}>
      {!isLoading && (
        <Box className="tw-flex tw-justify-center">
          <Typography variant="h2" className="tw-block tw-mb-7 tw-font-bold">
            User Profile
          </Typography>
        </Box>
      )}

      {isLoading ? (
        <Typography variant="h6" component="div" sx={{ mt: 2, mb: 1 }}>
          Loading business details...
        </Typography>
      ) : businessData ? (
        <Card
          sx={{
            maxWidth: "100%",
            boxShadow: 3,
            backgroundColor: "white",
          }}
          className="tw-mx-auto tw-my-5"
        >
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="tw-flex tw-flex-wrap tw-mx-3 tw-mb-2 tw-py-5">
                <Box className="tw-w-full md:tw-w-1/2 tw-pr-5 tw-pl-4 tw-mb-6 md:tw-mb-0">
                  {/* <Box className="tw-flex tw-flex-col tw-mb-4">
                    <Typography
                      variant="body1"
                      className="tw-block tw-mb-2 tw-font-bold"
                    >
                      Please upload your business logo
                    </Typography>
                    <Box className="tw-flex tw-items-center">
                      <input
                        accept="image/*"
                        id="business-logo"
                        type="file"
                        className="tw-hidden"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="business-logo">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera
                            style={{ width: "100px", height: "100px" }}
                          />
                        </IconButton>
                      </label>
                      {businessLogoURL && (
                        <Avatar
                          src={businessLogoURL}
                          alt="Business Logo"
                          sx={{ width: 100, height: 100, ml: 5 }}
                        />
                      )}
                    </Box>
                  </Box> */}
                  <Box className="tw-mb-2">
                    <Typography
                      variant="body1"
                      className="tw-block tw-mb-2 tw-font-bold"
                    >
                      Business Name
                    </Typography>
                    <TextField
                      fullWidth
                      {...register("businessName")}
                      className="tw-mb-3"
                      size="medium"
                    />
                  </Box>
                  <Box className="tw-mb-2">
                    <Typography
                      variant="body1"
                      className="tw-block tw-mb-2 tw-font-bold"
                    >
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      type="password"
                      {...register("password")}
                      className="tw-mb-3"
                      size="medium"
                    />
                  </Box>
                </Box>
                <Box className="tw-w-full md:tw-w-1/2 tw-pr-5 tw-pl-5">
                  <Box className="tw-mb-2">
                    <Typography
                      variant="body1"
                      className="tw-block tw-mb-2 tw-font-bold"
                    >
                      Business Description
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      {...register("businessDescription")}
                      InputProps={{ overflowY: "scroll" }}
                    />
                  </Box>
                  <Box className="tw-mb-2">
                    <Typography
                      variant="body1"
                      className="tw-block tw-mb-2 tw-font-bold"
                    >
                      Business Location
                    </Typography>
                    <Controller
                      name="location"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="tw-mb-3"
                          MenuProps={menuProps}
                          fullWidth
                        >
                          {cities.map((city) => (
                            <MenuItem key={city} value={city}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                  <Box className="tw-flex tw-justify-end">
                    <Button variant="contained" type="submit" color="primary">
                      Edit Business
                    </Button>
                  </Box>
                </Box>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" component="div" sx={{ mt: 2, mb: 1 }}>
          Error fetching business details.
        </Typography>
      )}
    </Container>
  );
};

export default BusinessSettings;
