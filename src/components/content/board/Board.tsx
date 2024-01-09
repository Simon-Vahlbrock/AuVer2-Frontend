import { FC } from 'react';
import { Board as IBoard } from '../../../types/boards.ts';
import { Box, Typography, useTheme } from '@mui/material';
import BoardContextMenu from './board-context-menu/BoardContextMenu.tsx';

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
                    padding: '16px 8px 16px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '36px',
                    backgroundColor: theme.custom.taskHeader,
                    borderBottom: `3px solid ${theme.custom.menuBorderColor}`
                }}
            >
                <Typography component="h1" variant="h5" color="primary.light">
                    {name}
                </Typography>
                <BoardContextMenu id={id}/>
            </Box>
            <Box>Tasks</Box>
        </Box>
    );
};

Board.displayName = 'Board';

export default Board;
