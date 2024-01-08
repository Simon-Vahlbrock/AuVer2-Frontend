import { PaletteMode, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            secondaryBackgroundColor: string;
            menuBorderColor: string;
            iconColor: string;
        };
    }

    interface ThemeOptions {
        custom: {
            secondaryBackgroundColor: string;
            menuBorderColor: string;
            iconColor: string;
        };
    }
}

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#3a5a7c',
                    light: '#3a5a7c',
                    dark: '#3a5a7c',
                    contrastText: '#3a5a7c',
                },
                background: {
                    default: '#fff',
                    paper: '#f1f1f1',
                }
            }
            : {
                primary: {
                    main: '#3a5a7c',
                    light: '#3a5a7c',
                    dark: '#3a5a7c',
                    contrastText: '#3a5a7c',
                },
                background: {
                    default: '#1f1d29',
                    paper: '#424242',
                }
            }),
    },
    typography: {
        fontFamily: 'sans-serif',
        fontSize: 14,
    },
    custom: {
        secondaryBackgroundColor: mode === 'light' ? '#f1f1f1' : '#14161c',
        menuBorderColor: mode === 'light' ? '#e1e1e1' : '#292836',
        iconColor: mode === 'light' ? '#000000' : '#e5e5e5',
    }
});
