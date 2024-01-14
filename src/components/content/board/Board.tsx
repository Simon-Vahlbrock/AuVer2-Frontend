import { FC, useCallback } from 'react';
import { Board as IBoard, BoardPosition } from '../../../types/boards.ts';
import { Box, Typography, useTheme } from '@mui/material';
import BoardContextMenu from './board-context-menu/BoardContextMenu.tsx';
import { useAppSelector } from '../../../hooks/redux.ts';
import { selectTaskByBoardId } from '../../../redux-modules/tasks/selectors.ts';
import Task from './task/Task.tsx';
import { RootState } from '../../../redux-modules';
import AddTask from './add-task/AddTask.tsx';

interface BoardProps {
    id: IBoard['id'];
    name: IBoard['name'];
    boardPosition: BoardPosition;
}

const Board: FC<BoardProps> = ({ name, id, boardPosition }) => {
    const tasksSelector = useCallback((state: RootState) => selectTaskByBoardId(state, id), [id]);
    const tasks = useAppSelector(tasksSelector);

    const theme = useTheme();

    return (
        <Box
            sx={{
                minWidth: '400px',
                maxWidth: '400px',
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
            <Box>
                {tasks?.map((task) => (
                    <Task
                        boardPosition={boardPosition}
                        key={task.id}
                        task={task}
                    />
                ))}
            </Box>
            <AddTask boardId={id}/>
        </Box>
    );
};

Board.displayName = 'Board';

export default Board;
