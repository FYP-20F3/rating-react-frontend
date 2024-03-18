import { Stack, Typography } from "@mui/material";
import SearchTextField from "../common/SearchTextField";
import { useSearchName } from "../../../context/SearchNameContext";

const ListHero = ({ category }) => {
  const widthSpacing = {
    width: { md: "120%" },
  };

  const paddingSpacing = {
    paddingNormal: {
      tb: 0.6,
      rl: 4,
    },
    paddingSm: {
      tb: 0.5,
      rl: 2,
    },
  };

  const { searchName, setSearchName } = useSearchName();
  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchButton = () => {
    const updatedQueryString = new URLSearchParams({
      searchName: searchName,
    }).toString();
    navigate(`/customer/search?${updatedQueryString}`);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
        pt: 17,
        pb: 8,
      }}
    >
      <Typography variant="h2" component="h2" align="center" sx={{}}>
        Businesses List In
        <Typography variant="h2" component="p" align="center" color="primary">
          {category}
        </Typography>
      </Typography>
      <Stack sx={{ marginTop: "2.5rem" }}>
        <SearchTextField
          wSpacing={widthSpacing.width}
          mSpacing={1.5}
          hSpacing={2.7}
          pNormalSpacing={paddingSpacing.paddingNormal}
          pSmallSpacing={paddingSpacing.paddingSm}
          handleSearch={handleSearch}
          handleSearchButton={handleSearchButton}
        />
      </Stack>
    </Stack>
  );
};

export default ListHero;
