import React from 'react';
import { Box } from "@mui/material";
import AnalysisFilter from '../../../../components/business/analysisfilter/analysisFilter';


const Analysis = () => {
    return (
        <Box sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 2,
            px: 18,
            height: "100vh",
            width: "100%"
        }}> <AnalysisFilter />

        </Box>
    )
}

export default Analysis