import { FC } from 'react';
import { Board as IBoard } from '../../../types/boards.ts';
import { Box, Typography, useTheme } from '@mui/material';

interface BoardProps {
    id: IBoard['id'];
    name: IBoard['name'];
}

const Board: FC<BoardProps> = ({ name, id }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: '400px',
                border: `6px solid ${theme.custom.menuBorderColor}`,
                borderRadius: '4px',
            }}
        >
            <Box
                sx={{
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '36px',
                }}
            >
                <Typography component="h1" variant="h5" color="primary.light">
                    {name}
                </Typography>
                <Box>Hallo</Box>
            </Box>
        </Box>
    );
};

Board.displayName = 'Board';

export default Board;
