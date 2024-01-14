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
import { saveTaskUpdate } from '../../../../../redux-modules/tasks/actions.ts';
import TaskContextMenu from './task-context-menu/TaskContextMenu.tsx';

interface TaskHeaderProps {
    title: string;
    id: number;
}

const TaskHeader: FC<TaskHeaderProps> = ({ id, title }) => {
    const [localTitle, setLocalTitle] = useState(title);

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

    return (
        <Box
            sx={{
                padding: '16px 8px 16px 16px',
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
            <TaskContextMenu id={id}/>
        </Box>
    );
};

TaskHeader.displayName = 'TaskHeader';

export default TaskHeader;
