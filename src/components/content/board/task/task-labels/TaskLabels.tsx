import { FC } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../../../hooks/redux.ts';
import { selectLabels } from '../../../../../redux-modules/labels/selectors.ts';

interface TaskLabelsProps {
    assignedLabelIds: number[];
}

const TaskLabels: FC<TaskLabelsProps> = ({ assignedLabelIds }) => {
    const labels = useAppSelector(selectLabels);

    return (
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '20px',
            padding: '0 16px 8px'
        }}
        >
            {assignedLabelIds.map((labelId) => {
                const label = labels.find((label) => label.id === labelId)!;

                return (
                    <Box
                        key={labelId}
                        sx={{
                            backgroundColor: label.color,
                            height: '10px',
                            width: '44px',
                            borderRadius: '16px',
                        }}
                    ></Box>
                );
            })}
        </Box>
    );
};

TaskLabels.displayName = 'TaskLabels';

export default TaskLabels;
