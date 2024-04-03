import React from 'react';
import { Box } from "@mui/material";
import AnalysisFilter from '../../../../components/business/analysisfilter/analysisFilter';
import MonthlySentimentB from '../../../../components/business/monthlysentimentbarchart/MonthlySentimentB';
import YearlySentimentLineChart from '../../../../components/business/yearlysentimentlinechart/YearlySentimentLineChart';
import RevCatMonthlyLineChart from '../../../../components/business/reviewcategorymonthlyline/RevCatMonthlyLineChart';



const Analysis = () => {
    return (
        <Box sx={{
            bgcolor: "background.paper",
            // height: "1000vh",
            width: "100%"
        }}>
            {/* <AnalysisFilter /> */}
            {/* <MonthlySentimentB /> */}
            {/* <YearlySentimentLineChart /> */}
            <RevCatMonthlyLineChart />
        </Box>
    )
}

export default Analysis