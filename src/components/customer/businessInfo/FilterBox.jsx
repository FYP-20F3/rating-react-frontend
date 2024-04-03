import {
  Box,
  Checkbox,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  List,
  ListItem,
  Select,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Search, FilterAlt, Close } from "@mui/icons-material";
import { useState } from "react";

const FilterBox = ({
  starRatings,
  handleCheckboxChange,
  ratings,
  keyword,
  reply,
  category,
  sort,
}) => {
  const reviewCategories = [
    { value: "all", label: "All Reivews" },
    { value: "service", label: "Service" },
    { value: "delivery", label: "Delivery" },
    { value: "product", label: "Product" },
    { value: "packaging", label: "Packaging" },
  ];
  const [open, setOpen] = useState(false);
  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        ml: 10,
        mr: 30,
        backgroundColor: "background.paper",
        py: 2,
        px: 5,
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          component="p"
          className="tw-text-lg tw-font-medium tw-text-gray-500"
        >
          Reviews
        </Typography>
      </Box>
      <Box className="star-rating">
        <label key={1}>
          <Checkbox
            checked={starRatings[0]}
            onChange={(event) => handleCheckboxChange(event, 0)}
            color="primary"
            inputProps={{ "aria-label": "rating-5" }}
          />
          <Typography component="span" className="tw-text-blue-500 tw-text-sm">
            5 star
          </Typography>
        </label>
        <Box className="star-rating-bar tw-bg-gray-200">
          <Box
            className="star-rating-fill"
            style={{ width: ratings.rating5 }}
          />
        </Box>
        <Typography
          variant="body2"
          component="span"
          className="star-rating-percentage"
        >
          {ratings.rating5}
        </Typography>
      </Box>
      <Box className="star-rating">
        <label key={2}>
          <Checkbox
            checked={starRatings[1]}
            onChange={(event) => handleCheckboxChange(event, 1)}
            color="primary"
            inputProps={{ "aria-label": "rating-4" }}
          />
          <Typography component="span" className="tw-text-blue-500 tw-text-sm">
            4 star
          </Typography>
        </label>
        <Box className="star-rating-bar tw-bg-gray-200">
          <Box
            className="star-rating-fill"
            style={{ width: ratings.rating4 }}
          />
        </Box>
        <Typography
          variant="body2"
          component="span"
          className="star-rating-percentage"
        >
          {ratings.rating4}
        </Typography>
      </Box>
      <Box className="star-rating">
        <label key={3}>
          <Checkbox
            checked={starRatings[2]}
            onChange={(event) => handleCheckboxChange(event, 2)}
            color="primary"
            inputProps={{ "aria-label": "rating-3" }}
          />
          <Typography component="span" className="tw-text-blue-500 tw-text-sm">
            3 star
          </Typography>
        </label>
        <Box className="star-rating-bar tw-bg-gray-200">
          <Box
            className="star-rating-fill"
            style={{ width: ratings.rating3 }}
          />
        </Box>
        <Typography
          variant="body2"
          component="span"
          className="star-rating-percentage"
        >
          {ratings.rating3}
        </Typography>
      </Box>
      <Box className="star-rating">
        <label key={4}>
          <Checkbox
            checked={starRatings[3]}
            onChange={(event) => handleCheckboxChange(event, 3)}
            color="primary"
            inputProps={{ "aria-label": "rating-2" }}
          />
          <Typography component="span" className="tw-text-blue-500 tw-text-sm">
            2 star
          </Typography>
        </label>
        <Box className="star-rating-bar tw-bg-gray-200">
          <Box
            className="star-rating-fill"
            style={{ width: ratings.rating2 }}
          />
        </Box>
        <Typography
          variant="body2"
          component="span"
          className="star-rating-percentage"
        >
          {ratings.rating2}
        </Typography>
      </Box>
      <Box className="star-rating">
        <label key={5}>
          <Checkbox
            checked={starRatings[4]}
            onChange={(event) => handleCheckboxChange(event, 4)}
            color="primary"
            inputProps={{ "aria-label": "rating-1" }}
          />
          <Typography component="span" className="tw-text-blue-500 tw-text-sm">
            1 star
          </Typography>
        </label>
        <Box className="star-rating-bar tw-bg-gray-200">
          <Box
            className="star-rating-fill"
            style={{ width: ratings.rating1 }}
          />
        </Box>
        <Typography
          variant="body2"
          component="span"
          className="star-rating-percentage"
        >
          {ratings.rating1}
        </Typography>
      </Box>
      <Divider sx={{ mt: 3 }} />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          className="tw-text-blue-600 tw-border-blue-600 hover:tw-bg-blue-200"
          onClick={toggleDrawer}
        >
          Filter
          <FilterAlt className="tw-ml-1" />
        </Button>
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "white",
              width: "29rem",
            },
            "& .MuiModal-backdrop": {
              backgroundColor: "transparent",
            },
          }}
          disableScrollLock
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="drawer-header"
            component="div"
          >
            <Typography variant="h2" component="h2">
              Filter By
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <List>
            <ListItem className="tw-px-5 tw-mb-3">
              <TextField
                placeholder="Search by keyword"
                variant="outlined"
                size="small"
                value={keyword.key}
                onChange={keyword.handleKeywordChange}
                className="tw-w-[25.5rem]"
                InputProps={{
                  startAdornment: <Search />,
                  sx: {
                    "& .MuiInputBase-input": {
                      fontSize: "18px",
                      pl: 1,
                      borderRadius: 2,
                    },
                    "& .MuiOutlinedInput-root": {
                      p: 2.8,
                    },
                  },
                }}
              />
            </ListItem>
            <ListItem className="tw-px-5 tw-mb-2">
              <Typography variant="h3" component="h4">
                Review With Replies
              </Typography>
              <Checkbox
                checked={reply.reply}
                onChange={reply.handleReplyChange}
              />
            </ListItem>
            <ListItem className="tw-px-5 tw-mb-3">
              <FormControl fullWidth>
                <Typography
                  variant="h4"
                  component="h4"
                  id="review-category-label"
                  className="tw-mb-3"
                >
                  Review Category
                </Typography>
                <Select
                  labelId="review-category-label"
                  defaultValue="all"
                  value={category.category}
                  onChange={category.handleCategoryChange}
                >
                  {reviewCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem className="tw-px-5 tw-mb-3">
              <FormControl fullWidth>
                <Typography
                  variant="h4"
                  component="h4"
                  id="sort-review-label"
                  className="tw-mb-3"
                >
                  Sort by date
                </Typography>
                <Select
                  labelId="sort-review-label"
                  defaultValue="new"
                  value={sort.sort}
                  onChange={sort.handleSortChange}
                >
                  <MenuItem value="new">New Reviews</MenuItem>
                  <MenuItem value="old">Old Reviews</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </Box>
  );
};
export default FilterBox;
