import { FC } from 'react';
import { Task as ITask } from '../../../../types/task.ts';
import { Box } from '@mui/material';
import TaskHeader from './task-header/TaskHeader.tsx';
import TaskLabels from './task-labels/TaskLabels.tsx';
import TaskText from './task-text/TaskText.tsx';
import { BoardPosition } from '../../../../types/boards.ts';

interface TaskProps {
    task: ITask;
    boardPosition: BoardPosition;
}

const Task: FC<TaskProps> = ({ task, boardPosition }) => {
    const { id, title, assignedUserNames, boardId, assignedLabelIds, text } = task;

    return (
        <Box>
            <TaskHeader id={id} title={title} boardPosition={boardPosition} boardId={boardId}/>
            <TaskLabels assignedLabelIds={assignedLabelIds}/>
            <TaskText text={text} id={id}/>
        </Box>
    );
};

Task.displayName = 'Task';

export default Task;
