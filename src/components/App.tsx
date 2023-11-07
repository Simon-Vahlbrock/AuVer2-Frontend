import { FC, useMemo, useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens } from '../utils/theme.ts';

const App: FC = () => {
    const [mode, setMode] = useState<PaletteMode>('light');

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ThemeProvider theme={theme}>
            {theme.palette.mode}
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
