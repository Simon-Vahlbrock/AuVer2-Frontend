import { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { useAppSelector } from '../../hooks/redux.ts';
import { selectBoards } from '../../redux-modules/boards/selectors.ts';
import Board from './board/Board.tsx';
import { BoardPosition } from '../../types/boards.ts';
import History from './history/History.tsx';
import './content.css';

const Content: FC = () => {
    const theme = useTheme();
    const boards = useAppSelector(selectBoards);

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1
            }}
        >
            <Box
                className="board-wrapper"
            >
                {boards.map(({ id, name }, index) => {
                    let boardPosition = BoardPosition.Any;

                    if (index === 0) {
                        boardPosition = BoardPosition.First;
                    }

                    if (index === boards.length - 1) {
                        boardPosition = BoardPosition.Last;
                    }

                    return (
                        <Board
                            key={id}
                            id={id}
                            name={name}
                            boardPosition={boardPosition}
                        />
                    );
                })}
            </Box>
            <Box
                sx={{
                    flex: 2,
                    borderLeft: `${theme.custom.menuBorderColor} solid 3px`,
                }}
            >
                <History/>
            </Box>
        </Box>
    );
};

Content.displayName = 'Content';

export default Content;
