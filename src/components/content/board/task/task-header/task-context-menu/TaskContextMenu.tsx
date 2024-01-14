import { FC, MouseEvent, useState } from 'react';
import { Task } from '../../../../../../types/task.ts';
import {
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserDialog from './user-dialog/UserDialog.tsx';
import LabelsDialog from './labels-dialog/LabelsDialog.tsx';

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

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeContextMenu = () => {
        setAnchorEl(null);
    };

    const handleAssignUsersClick = () => {
        setDialogOption(DialogOptions.AssignUsers);
        closeContextMenu();
    };

    const handleAssignLabelsClick = () => {
        setDialogOption(DialogOptions.AssignLabels);
        closeContextMenu();
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
            <UserDialog
                id={id}
                isOpen={dialogOption === DialogOptions.AssignUsers}
                closeDialog={() => setDialogOption(null)}
            />
            <LabelsDialog
                id={id}
                isOpen={dialogOption === DialogOptions.AssignLabels}
                closeDialog={() => setDialogOption(null)}
            />
        </div>
    );
};

TaskContextMenu.displayName = 'TaskContextMenu';

export default TaskContextMenu;
