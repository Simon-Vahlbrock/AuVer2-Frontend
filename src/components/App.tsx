import { FC, useMemo, useState } from 'react';
import { Box, createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens } from '../utils/theme.ts';
import Header from './header/Header.tsx';
import Login from './login/Login.tsx';

const App: FC = () => {
    const isLoggedIn = false;
    const [mode, setMode] = useState<PaletteMode>('light');

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ThemeProvider theme={theme}>
            {isLoggedIn && (
                <Box>
                    <Header setMode={setMode}/>
                </Box>
            )}
            {!isLoggedIn && (
                <Login/>
                )}
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
