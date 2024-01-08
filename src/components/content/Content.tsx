import { FC } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux.ts';
import { selectBoards } from '../../redux-modules/boards/selectors.ts';
import Board from './board/Board.tsx';

const Content: FC = () => {
    const boards = useAppSelector(selectBoards);

    return (
        <Box
            sx={{
                display: 'flex',
                padding: '16px',
                gap: '28px',
            }}
        >
            {boards.map(({ id, name}) => (
                <Board key={id} id={id} name={name}/>
            ))}
        </Box>
    );
};

Content.displayName = 'Content';

export default Content;
