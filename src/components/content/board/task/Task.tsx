import { FC } from 'react';
import { Task as ITask } from '../../../../types/task.ts';
import { Box } from '@mui/material';
import TaskHeader from './task-header/TaskHeader.tsx';

interface TaskProps {
    task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
    const { name, id, title, assignedUserNames, boardId, assignedLabelIds, text } = task;

    return (
        <Box>
            <TaskHeader id={id} title={title}/>
        </Box>
    );
};

Task.displayName = 'Task';

export default Task;
