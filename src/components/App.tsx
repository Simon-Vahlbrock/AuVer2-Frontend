import { FC, useMemo, useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { getDesignTokens } from '../utils/theme.ts';
import Header from './header/Header.tsx';

const App: FC = () => {
    const [mode, setMode] = useState<PaletteMode>('light');

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <Header setMode={setMode}/>
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
