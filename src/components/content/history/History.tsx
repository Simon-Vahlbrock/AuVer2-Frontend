import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks/redux.ts';
import {
    selectHistoryEntries, selectHistoryEntryOfToday
} from '../../../redux-modules/history/selectors.ts';
import HistoryEntry from './history-entry/HistoryEntry.tsx';


const History: FC = () => {
    const historyEntries = useAppSelector(selectHistoryEntries);
    const historyEntryOfToday = useAppSelector(selectHistoryEntryOfToday);

    return (
        <Box>
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    color: 'white',
                    padding: '8px 0 8px 12px'
                }}
            >
                History
            </Typography>
            <Box>
                <HistoryEntry historyEntry={historyEntryOfToday}/>
                {historyEntries.map((historyEntry) => (
                    <HistoryEntry key={historyEntry.id} historyEntry={historyEntry}/>
                ))}
            </Box>
        </Box>
    );
};

History.displayName = 'History';

export default History;
