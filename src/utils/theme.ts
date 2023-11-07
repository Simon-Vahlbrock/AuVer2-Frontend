import { PaletteMode } from '@mui/material';
import { amber } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: amber
            }
            : {
                primary: amber,
            }),
    },
});
