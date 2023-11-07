import { FC } from 'react';
import { Box, TextField, useTheme } from '@mui/material';

const Header: FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: '100vw',
                bgcolor: theme.custom.secondaryBackgroundColor,
                borderBottom: `${theme.custom.menuBorderColor} solid 3px`,
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '12px',
                    flex: 1,
                    color: theme.palette.primary.main
                }}
            >
                <h1>AuVer2</h1>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: '0 0 auto',
                    width: '55vw',
                    padding: '0.8rem 1.6rem'
                }}
            >
                <TextField
                    label="Suche"
                    variant="outlined"
                    sx={{
                        width: '100%',
                    }}
                />
            </Box>
            <Box sx={{ flex: 1 }}>

            </Box>
        </Box>
    );
};

Header.displayName = 'Header';

export default Header;
