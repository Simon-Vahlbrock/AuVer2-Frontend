import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { throttle } from 'lodash';
import { saveTaskUpdate } from '../../../../../redux-modules/tasks/actions.ts';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import {
    removeSelectedTaskElement,
    setSelectedTaskElement,
    updateTask
} from '../../../../../redux-modules/tasks/slice.ts';
import { TaskElementTypes } from '../../../../../types/task.ts';

interface TaskTextProps {
    text: string;
    id: number;
}

const TaskText: FC<TaskTextProps> = ({ text, id }) => {
    const [localText, setLocalText] = useState(text);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const theme = useTheme();

    const dispatch = useAppDispatch();

    useEffect(() => {
        setLocalText(text);
    }, [text]);

    useEffect(() => {
        resizeTextarea();
    }, [localText]);

    const throttledTextUpdate = useRef(
        throttle((newText: string) => {
            void dispatch(saveTaskUpdate({ id, text: newText }));
        }, 500)
    ).current;

    useEffect(() => {
        return () => {
            throttledTextUpdate.cancel();
        };
    }, [throttledTextUpdate]);

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        setLocalText(newText);

        throttledTextUpdate(newText);
    };

    const onFocus = () => {
        dispatch(setSelectedTaskElement({ taskId: id, type: TaskElementTypes.Text }));
    };

    const onBlur = () => {
        dispatch(removeSelectedTaskElement());
        dispatch(updateTask({ id, text: localText }));
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
                padding: '0 8px 8px 16px',
                borderBottom: `6px solid ${theme.custom.menuBorderColor}`,
            }}
        >
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
                   color: theme.custom.font,
                   overflowY: 'hidden', /* Hide vertical scrollbar initially */
               }}
               value={localText}
               onFocus={onFocus}
               onBlur={onBlur}
               onChange={handleTextChange}
               ref={textareaRef}
           />
        </Box>
    );
};

TaskText.displayName = 'TaskText';

export default TaskText;
