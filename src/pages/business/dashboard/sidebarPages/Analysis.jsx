import React, { useState } from 'react';
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import AnalysisFilter from '../../../../components/business/analysisfilter/analysisFilter';
import MonthlySentimentB from '../../../../components/business/monthlysentimentbarchart/MonthlySentimentB';
import YearlySentimentLineChart from '../../../../components/business/yearlysentimentlinechart/YearlySentimentLineChart';
import RevCatMonthlyLineChart from '../../../../components/business/reviewcategorymonthlyline/RevCatMonthlyLineChart';
import MonthlySentimentLineChart from '../../../../components/business/monthlysentimentlinechart/MonthlySentimentLineChart';

const Analysis = () => {
    const [selectedChart, setSelectedChart] = useState('MonthlySentimentLineChart');

    const handleChartChange = (chartType) => {
        setSelectedChart(chartType);
    };

    return (
        <Box sx={{
            // bgcolor: "background.paper",
            width: "100%",
            height: "100%",
            padding: "20px",
        }}>
            <Typography variant="h4" gutterBottom>
                Analysis Dashboard
            </Typography>

            <ButtonGroup sx={{ marginBottom: "20px", display: 'flex', justifyContent: "center" }}>
                <Button
                    variant={selectedChart === 'MonthlySentimentLineChart' ? 'contained' : 'outlined'}
                    onClick={() => handleChartChange('MonthlySentimentLineChart')}
                >
                    Monthly Line Chart
                </Button>
                <Button
                    variant={selectedChart === 'MonthlySentimentB' ? 'contained' : 'outlined'}
                    onClick={() => handleChartChange('MonthlySentimentB')}
                >
                    Monthly Bar Chart
                </Button>
                <Button
                    variant={selectedChart === 'YearlySentimentLineChart' ? 'contained' : 'outlined'}
                    onClick={() => handleChartChange('YearlySentimentLineChart')}
                >
                    Yearly Line Chart
                </Button>
                <Button
                    variant={selectedChart === 'RevCatMonthlyLineChart' ? 'contained' : 'outlined'}
                    onClick={() => handleChartChange('RevCatMonthlyLineChart')}
                >
                    Review Category Monthly Line Chart
                </Button>
                <Button
                    variant={selectedChart === 'AnalysisFilter' ? 'contained' : 'outlined'}
                    onClick={() => handleChartChange('AnalysisFilter')}
                >
                    Review Rating Analysis
                </Button>
            </ButtonGroup>

            {selectedChart === 'MonthlySentimentLineChart' && <MonthlySentimentLineChart />}
            {selectedChart === 'MonthlySentimentB' && <MonthlySentimentB />}
            {selectedChart === 'YearlySentimentLineChart' && <YearlySentimentLineChart />}
            {selectedChart === 'RevCatMonthlyLineChart' && <RevCatMonthlyLineChart />}
            {selectedChart === 'AnalysisFilter' && <AnalysisFilter />}
        </Box>
    )
}

export default Analysis;
