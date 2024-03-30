import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function FakenessSuggestions({ suggestions }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          Suggestions
        </Typography>
        {suggestions && suggestions.length > 0 ? (
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem key={index} sx={{ paddingBottom: 0 }}>
                <ListItemText
                  primary={
                    <Typography variant="body2">{suggestion}</Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2">No suggestions available.</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default FakenessSuggestions;
