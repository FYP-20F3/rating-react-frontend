import React, { useState } from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import AnalysisFilter from "../../../../components/business/analysisfilter/analysisFilter";
import MonthlySentimentB from "../../../../components/business/monthlysentimentbarchart/MonthlySentimentB";
import YearlySentimentLineChart from "../../../../components/business/yearlysentimentlinechart/YearlySentimentLineChart";
import MonthlySentimentLineChart from "../../../../components/business/monthlysentimentlinechart/MonthlySentimentLineChart";
import { RevCatYearlyLineChart } from "../../../../components/business/reviewcategoryyearlyline/RevCatYearlyLineChart";

const Analysis = () => {
  const [selectedChart, setSelectedChart] = useState(
    "MonthlySentimentLineChart"
  );

  const handleChartChange = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <Box
      sx={{
        // bgcolor: "background.paper",
        // width: "100%",
        height: "100%",
        // padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Analysis Dashboard
      </Typography>

      <ButtonGroup
        sx={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}
      >
        <Button
          variant={
            selectedChart === "MonthlySentimentLineChart"
              ? "contained"
              : "outlined"
          }
          onClick={() => handleChartChange("MonthlySentimentLineChart")}
        >
          Monthly Sentiment Line Chart
        </Button>
        <Button
          variant={
            selectedChart === "MonthlySentimentB" ? "contained" : "outlined"
          }
          onClick={() => handleChartChange("MonthlySentimentB")}
        >
          Monthly Sentiment Bar Chart
        </Button>
        <Button
          variant={
            selectedChart === "YearlySentimentLineChart"
              ? "contained"
              : "outlined"
          }
          onClick={() => handleChartChange("YearlySentimentLineChart")}
        >
          Yearly Sentiment Line Chart
        </Button>
        <Button
          variant={
            selectedChart === "RevCatYearlyLineChart" ? "contained" : "outlined"
          }
          onClick={() => handleChartChange("RevCatYearlyLineChart")}
        >
          Category Yearly Line Chart
        </Button>
        <Button
          variant={
            selectedChart === "AnalysisFilter" ? "contained" : "outlined"
          }
          onClick={() => handleChartChange("AnalysisFilter")}
        >
          Rating Yearly
        </Button>
      </ButtonGroup>

      {selectedChart === "MonthlySentimentLineChart" && (
        <MonthlySentimentLineChart />
      )}
      {selectedChart === "MonthlySentimentB" && <MonthlySentimentB />}
      {selectedChart === "YearlySentimentLineChart" && (
        <YearlySentimentLineChart />
      )}
      {selectedChart === "RevCatYearlyLineChart" && <RevCatYearlyLineChart />}
      {selectedChart === "AnalysisFilter" && <AnalysisFilter />}
    </Box>
  );
};

export default Analysis;
