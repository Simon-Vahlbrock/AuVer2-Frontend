import { FC } from 'react';
import { useAppDispatch } from '../../../../../../../hooks/redux.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { saveTaskRemove } from '../../../../../../../redux-modules/tasks/actions.ts';

interface DeleteTaskDialogProps {
    isOpen: boolean;
    closeDialog: VoidFunction;
    id: number;
}

const DeleteTaskDialog: FC<DeleteTaskDialogProps> = ({ closeDialog, isOpen, id }) => {
    const dispatch = useAppDispatch();

    const handleCancelClick = () => {
        closeDialog();
    };

    const handleDeleteClick = () => {
        void dispatch(saveTaskRemove({ taskId: id }));

        closeDialog();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleCancelClick}
        >
            <DialogTitle>
                Aufgabe löschen
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Möchtest du diese Aufgabe wirklich löschen?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClick} sx={{color:'white'}} variant='contained'>
                    Abbrechen
                </Button>
                <Button onClick={handleDeleteClick} sx={{color:'white'}} variant='contained'>
                    Löschen
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DeleteTaskDialog.displayName = 'DeleteTaskDialog';

export default DeleteTaskDialog;
