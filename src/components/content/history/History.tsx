import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const History: FC = () => {
    return (
        <Box

        >
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    color: 'white',
                    padding: '8px'
                }}
            >
                History
            </Typography>
        </Box>
    );
};

History.displayName = 'History';

export default History;
