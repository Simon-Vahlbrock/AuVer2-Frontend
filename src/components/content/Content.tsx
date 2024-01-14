import { FC } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux.ts';
import { selectBoards } from '../../redux-modules/boards/selectors.ts';
import Board from './board/Board.tsx';
import { BoardPosition } from '../../types/boards.ts';

const Content: FC = () => {
    const boards = useAppSelector(selectBoards);

    return (
        <Box
            sx={{
                display: 'flex',
                padding: '16px',
                gap: '28px',
                alignItems: 'flex-start',
            }}
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
    );
};

Content.displayName = 'Content';

export default Content;
