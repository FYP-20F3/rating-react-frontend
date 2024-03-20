import * as React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

const ReviewForm = () => {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <form
      className="max-w-lg mx-auto mt-16 px-7 py-5 bg-white shadow-lg rounded" // Maintain Tailwind CSS classes for styling
    >
      <Typography
        variant="h2"
        className="text-2xl font-bold mb-7 w-full text-center"
      >
        Review Form
      </Typography>
      <Box className="mb-4 px-5">
        <Typography variant="body1" className="block mb-2" id="rating">
          Rate Your Experience
        </Typography>
        <Grid container>
          {ratings.map((rating) => (
            <Grid item key={rating}>
              <Avatar
                aria-label="star box"
                variant="square"
                sx={{
                  bgcolor:
                    rating == 1
                      ? "box.red"
                      : rating <= 2
                      ? "box.orange"
                      : rating <= 3
                      ? "box.yellow"
                      : rating <= 4
                      ? "box.lime"
                      : rating <= 5
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
        </Grid>
      </Box>
      <Box className="mb-4 px-5">
        <Typography variant="body1" className="block mb-1" id="reviewType">
          Select the Review you want to give
        </Typography>
        <Select
          defaultValue="all"
          // value={id}
          labelId="reviewType"
          size="small"
          className="w-full py-0.5 px-0.5 border border-gray-300"
        >
          <MenuItem value="all" onClick={() => {}}>
            All Category
          </MenuItem>
        </Select>
      </Box>
      {/* Added optional id attributes on other Typography components */}
      <Box className="mb-4 px-5">
        <Typography
          variant="body1"
          className="block mb-1"
          id="descriptionLabel"
        >
          Tell us more about your experience
        </Typography>
        <TextField
          id="description" // htmlFor updated to id
          multiline
          rows={4}
          className="w-full py-0.5 px-0.5 border border-gray-300"
        />
      </Box>
      <Box className="mb-4 px-5">
        <Typography variant="body1" className="block mb-1" id="title">
          Give your review a title
        </Typography>
        <TextField
          id="title"
          type="text"
          className="w-full py-0.5 px-0.5 border border-gray-300"
        />
      </Box>
      <Box className="mb-5 px-5">
        <Typography variant="body1" className="block mb-1" id="date">
          Date of experience
        </Typography>
        <TextField
          id="date" // htmlFor updated to id
          type="date"
          className="w-full py-0.5 px-0.5 border border-gray-300"
        />
      </Box>
      <Box className="flex justify-center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="py-2 px-4 focus:outline-none focus:ring-2"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default ReviewForm;
