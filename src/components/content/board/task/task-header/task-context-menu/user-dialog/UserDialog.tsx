import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material';
import { selectAllUsers } from '../../../../../../../redux-modules/user/selectors.ts';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks/redux.ts';
import { RootState } from '../../../../../../../redux-modules';
import { selectTaskById } from '../../../../../../../redux-modules/tasks/selectors.ts';
import { saveAssignedUsersUpdate } from '../../../../../../../redux-modules/tasks/actions.ts';

interface UserDialogProps {
    isOpen: boolean;
    closeDialog: VoidFunction;
    id: number;
}

const UserDialog: FC<UserDialogProps> = ({ isOpen, closeDialog, id }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const taskSelector = useCallback((state: RootState) => selectTaskById(state, id), [id]);

    const { assignedUserNames } = useAppSelector(taskSelector);
    const users = useAppSelector(selectAllUsers);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setSelectedItems(assignedUserNames);
    }, [assignedUserNames]);

    const handleCheckboxChange = (user: string) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(user)) {
                return prevSelected.filter((selectedItem) => selectedItem !== user);
            } else {
                return [...prevSelected, user];
            }
        });
    };

    const handleCancelClick = () => {
        setSelectedItems(assignedUserNames);
        closeDialog();
    };

    const handleSaveClick = () => {
        void dispatch(saveAssignedUsersUpdate({ selectedUsers: selectedItems, taskId: id }));

        closeDialog();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleCancelClick}
        >
            <DialogTitle>
                Personen zuweisen
            </DialogTitle>
            <DialogContent>
                {users.map((user) => (
                    <FormControlLabel
                        key={user}
                        control={
                            <Checkbox
                                checked={selectedItems.includes(user)}
                                onChange={() => handleCheckboxChange(user)}
                            />
                        }
                        label={user}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    sx={{ color: 'white' }}
                    onClick={handleCancelClick}>
                    Abbrechen
                </Button>
                <Button
                    variant="contained"
                    sx={{ color: 'white' }}
                    onClick={handleSaveClick}
                >
                    Speichern
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UserDialog.displayName = 'UserDialog';

export default UserDialog;
