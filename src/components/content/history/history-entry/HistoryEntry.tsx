import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import { HistoryEntry as IHistoryEntry } from '../../../../types/history.ts';
import { saveHistoryUpdate } from '../../../../redux-modules/history/actions.ts';
import { useAppDispatch } from '../../../../hooks/redux.ts';
import { setSelectedHistoryId, updateHistoryEntry } from '../../../../redux-modules/history/slice.ts';
import { throttle } from 'lodash';

interface HistoryEntryProps {
    historyEntry: IHistoryEntry;
}

const formateDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
};

const HistoryEntry: FC<HistoryEntryProps> = ({ historyEntry }) => {
    const { id, description } = historyEntry;
    const [localDescription, setLocalDescription] = useState(description);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const theme = useTheme();

    const dispatch = useAppDispatch();

    useEffect(() => {
        setLocalDescription(description);
    }, [description]);

    useEffect(() => {
        resizeTextarea();
    }, [localDescription]);

    const throttledDescriptionUpdate = useRef(
        throttle((newDescription: string, givenId: number) => {
            void dispatch(saveHistoryUpdate({ id: givenId, description: newDescription }));
        }, 500)
    ).current;

    useEffect(() => {
        return () => {
            throttledDescriptionUpdate.cancel();
        };
    }, [throttledDescriptionUpdate]);

    const [isCreating, setIsCreating] = useState(false);

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = event.target.value;
        setLocalDescription(newDescription);

        if (id === -1 && !isCreating) {
            void dispatch(saveHistoryUpdate({ id, description: newDescription }));
            setIsCreating(true);
        }

        if (id > 0) {
            throttledDescriptionUpdate(newDescription, id);
        }
    };

    const onFocus = () => {
        dispatch(setSelectedHistoryId(id));
    };

    const onBlur = () => {
        dispatch(setSelectedHistoryId(undefined));
        dispatch(updateHistoryEntry({ id, description: localDescription }));
    };

    const resizeTextarea = () => {
        const textarea = textareaRef.current;

        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <Box
            sx={{
                padding: '8px',
                margin: '8px',
                border: `3px solid ${theme.custom.menuBorderColor}`,
            }}
        >
            <Typography
                component="div"
                sx={{
                    color: '#777777',
                }}
            >
                {formateDate(historyEntry.createdAt)}
            </Typography>
            <textarea
                onInput={resizeTextarea}
                rows={1}
                style={{
                    resize: 'none',
                    boxSizing: 'border-box', /* Include padding and border in the element's total width and height */
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'none',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    color: 'white',
                    overflowY: 'hidden', /* Hide vertical scrollbar initially */
                }}
                value={localDescription}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleDescriptionChange}
                ref={textareaRef}
            />
        </Box>
    );
};

HistoryEntry.displayName = 'HistoryEntry';

export default HistoryEntry;
