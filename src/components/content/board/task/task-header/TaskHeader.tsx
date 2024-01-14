import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { debounce } from 'lodash';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import {
    removeSelectedTaskElement,
    setSelectedTaskElement,
    updateTask
} from '../../../../../redux-modules/tasks/slice.ts';
import { TaskElementTypes } from '../../../../../types/task.ts';
import { saveBoardIdOfTaskUpdate, saveTaskUpdate } from '../../../../../redux-modules/tasks/actions.ts';
import TaskContextMenu from './task-context-menu/TaskContextMenu.tsx';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { BoardPosition } from '../../../../../types/boards.ts';

interface TaskHeaderProps {
    title: string;
    boardId: number;
    id: number;
    boardPosition: BoardPosition;
}

const TaskHeader: FC<TaskHeaderProps> = ({ id, title, boardPosition, boardId }) => {
    const [localTitle, setLocalTitle] = useState(title);
    const [isInFocus, setIsInFocus] = useState(false);

    const dispatch = useAppDispatch();

    const debouncedUpdateTitle = debounce((newTitle: string) => {
        void dispatch(saveTaskUpdate({ id, title: newTitle }));
    }, 500);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setLocalTitle(newTitle);

        debouncedUpdateTitle(newTitle);
    };

    const onFocus = () => {
        dispatch(setSelectedTaskElement({ taskId: id, type: TaskElementTypes.Title }));
    };

    const onBlur = () => {
        dispatch(removeSelectedTaskElement());
        dispatch(updateTask({ id, title: localTitle }));
    };

    useEffect(() => {
        setLocalTitle(title);
    }, [title]);

    const handleMoveTask = (goNext: boolean) => {
        void dispatch(saveBoardIdOfTaskUpdate({ taskId: id, goNext, boardId }));
    };


    return (
        <div
            onMouseOver={() => setIsInFocus(true)}
            onMouseLeave={() => setIsInFocus(false)}
        >
            <Box
                sx={{
                    padding: '16px 8px 0 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <input
                    type="text"
                    style={{
                        border: 'none',
                        outline: 'none',
                        background: 'none',
                        fontFamily: 'inherit',
                        fontSize: '1.2rem',
                        color: 'white',
                        caretColor: 'white',
                        width: '100%',
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={localTitle}
                    onChange={handleTitleChange}
                />
                {isInFocus && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '-4px',
                        }}
                    >
                        {boardPosition !== BoardPosition.First && (
                            <ArrowLeftIcon
                                sx={{ color: 'white', cursor: 'pointer' }}
                                onClick={() => handleMoveTask(false)}
                            />
                        )}
                        {boardPosition !== BoardPosition.Last && (
                            <ArrowRightIcon
                                sx={{ color: 'white', cursor: 'pointer' }}
                                onClick={() => handleMoveTask(true)}
                            />
                        )}
                    </Box>
                )}
                <TaskContextMenu id={id}/>
            </Box>
        </div>
    );
};

TaskHeader.displayName = 'TaskHeader';

export default TaskHeader;
