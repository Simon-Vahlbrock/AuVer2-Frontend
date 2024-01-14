import { FC, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../../../hooks/redux.ts';
import { savePostAdd } from '../../../../redux-modules/tasks/actions.ts';

interface AddTaskProps {
    boardId: number;
}

export const AddTask: FC<AddTaskProps> = ({ boardId }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const dispatch = useAppDispatch();

    const handleAddTaskClick = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setTitle('');
        setText('');
    };

    const handleSaveTask = () => {
        void dispatch(savePostAdd({ text, title, boardId }));

        setOpen(false);
        setTitle('');
        setText('');
    };

    const isButtonDisabled = title.trim().length === 0 || text.trim().length === 0;

    return (
        <>
            <Box
                sx={{
                    padding: '8px',
                    color: '#777777',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: '2px'
                }}
                onClick={handleAddTaskClick}
            >
                <AddIcon/>
                <div>Aufgabe hinzufügen</div>
            </Box>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Neue Aufgabe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Text"
                        fullWidth
                        value={text}
                        multiline
                        onChange={(e) => setText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} sx={{ color: 'white' }} variant="contained">
                        Abbrechen
                    </Button>
                    <Button
                        onClick={handleSaveTask}
                        sx={{ color: 'white' }}
                        variant="contained"
                        disabled={isButtonDisabled}
                    >
                        Speichern
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

AddTask.displayName = 'AddTask';

export default AddTask;
