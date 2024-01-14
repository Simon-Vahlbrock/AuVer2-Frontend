import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { Task } from '../../../../../../types/task.ts';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux.ts';
import { saveAssignedUsersUpdate } from '../../../../../../redux-modules/tasks/actions.ts';
import { RootState } from '../../../../../../redux-modules';
import { selectTaskById } from '../../../../../../redux-modules/tasks/selectors.ts';
import { selectAllUsers } from '../../../../../../redux-modules/user/selectors.ts';

interface TaskContextMenuProps {
    id: Task['id'];
}

enum DialogOptions {
    AssignUsers = 1,
    AssignLabels
}

const TaskContextMenu: FC<TaskContextMenuProps> = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dialogOption, setDialogOption] = useState<DialogOptions | null>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const taskSelector = useCallback((state: RootState) => selectTaskById(state, id), [id]);

    const { assignedUserNames } = useAppSelector(taskSelector);
    const users = useAppSelector(selectAllUsers);

    const dispatch = useAppDispatch();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        setSelectedItems(assignedUserNames);
    }, [assignedUserNames]);

    const closeContextMenu = () => {
        setAnchorEl(null);
    };

    const closeDialog = () => {
        setDialogOption(null);
    };

    const handleAssignUsersClick = () => {
        setDialogOption(DialogOptions.AssignUsers);
        closeContextMenu();
    };

    const handleAssignLabelsClick = () => {
        setDialogOption(DialogOptions.AssignLabels);
        closeContextMenu();
    };

    const handleSaveClick = () => {
        void dispatch(saveAssignedUsersUpdate({ selectedUsers: selectedItems, taskId: id }));

        setDialogOption(null);
    };

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

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeContextMenu}
            >
                <MenuItem onClick={handleAssignUsersClick}>Personen zuweisen</MenuItem>
                <MenuItem onClick={handleAssignLabelsClick}>Labels zuweisen</MenuItem>
            </Menu>
            <Dialog
                open={!!dialogOption}
                onClose={handleCancelClick}
            >
                {dialogOption === DialogOptions.AssignUsers && (
                    <>
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
                    </>
                )}
                {dialogOption === DialogOptions.AssignLabels && (
                    <>
                        <DialogTitle>
                            Labels zuweisen
                        </DialogTitle>
                        <DialogContent>
                            Test
                        </DialogContent>
                    </>
                )}
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
        </div>
    );
};

TaskContextMenu.displayName = 'TaskContextMenu';

export default TaskContextMenu;
