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

const AdminSettings = () => {
  const { register, handleSubmit, setValue } = useForm();
  //   const [businessLogoURL, setBusinessLogoURL] = useState(null);

  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  const adminId = currentUser?._id;

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

  const fetchAdminDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}admin/${adminId}`);
      setAdminData(response.data);
      setValue("firstName", response.data.firstName);
      setValue("lastName", response.data.lastName);
      //   setBusinessLogoURL(response.data.businessLogoPath);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching admin details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, [adminId]);

  const onSubmit = async (data) => {
    const hasChanges =
      data.firstName !== adminData.firstName ||
      data.lastName !== adminData.lastName ||
      //   businessLogoURL !== businessData.businessLogoPath ||
      data.password;

    console.log(hasChanges);
    console.log(data, adminData);
    // console.log(businessLogoURL);

    if (!hasChanges) {
      toast.error("Please change the fields to update the information.");
      return;
    }

    if (!data.firstName || !data.lastName) {
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
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      };

      console.log(requestData);

      const response = await axios.post(
        `${BASE_URL}admin/edit/${adminId}`,
        requestData
      );

      if (response.status === 201) {
        toast.error(response.data.msg);
      } else {
        toast.success(response.data.msg);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating admin information:", error);
      toast.error("Failed to update admin information. Please try again.");
    }
  };

  return (
    <Container className={"tw-h-[90vh]"}>
      {!isLoading && (
        <Box className="tw-flex tw-justify-center">
          <Typography variant="h2" className="tw-block tw-mb-7 tw-font-bold">
            User Profile
          </Typography>
        </Box>
      )}

      {isLoading ? (
        <Typography variant="h6" component="div" sx={{ mt: 2, mb: 1 }}>
          Loading admin details...
        </Typography>
      ) : adminData ? (
        <Card
          sx={{
            maxWidth: "50%",
            boxShadow: 3,
            backgroundColor: "white",
          }}
          className="tw-mx-auto"
        >
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="tw-flex tw-flex-wrap tw-mx-3 tw-py-5">
                <Box className="tw-w-full tw-pr-5 tw-pl-4 md:tw-mb-0">
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
                      First Name
                    </Typography>
                    <TextField
                      fullWidth
                      {...register("firstName")}
                      className="tw-mb-3"
                      size="medium"
                    />
                  </Box>
                  <Box className="tw-mb-2">
                    <Typography
                      variant="body1"
                      className="tw-block tw-mb-2 tw-font-bold"
                    >
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      {...register("lastName")}
                      className="tw-mb-3"
                      size="medium"
                    />
                  </Box>
                  <Box className="tw-mb-3">
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
                  <Box className="tw-flex tw-justify-center">
                    <Button variant="contained" type="submit" color="primary">
                      Edit Admin
                    </Button>
                  </Box>
                </Box>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" component="div" sx={{ mt: 2, mb: 1 }}>
          Error fetching admin details.
        </Typography>
      )}
    </Container>
  );
};

export default AdminSettings;
