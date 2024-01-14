import  { FC, useState, MouseEvent } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem, TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { saveBoardRename } from '../../../../redux-modules/boards/actions.ts';
import { useAppDispatch } from '../../../../hooks/redux.ts';
import { Board } from '../../../../types/boards.ts';

enum DialogOption {
    Rename = 1,
    Delete
}

interface BoardContextMenuProps {
    id: Board['id'];
}


const BoardContextMenu: FC<BoardContextMenuProps> = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dialogOption, setDialogOption] = useState<DialogOption | null>(null);
    const [newName, setNewName] = useState('');

    const dispatch = useAppDispatch();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const closeContextMenu = () => {
        setAnchorEl(null);
    };

    const handleSaveClick = () => {
        if (dialogOption === DialogOption.Rename) {
            void dispatch(saveBoardRename({ id, name: newName }));
        }

        setDialogOption(null);
    };

    const closeDialog = () => {
        setDialogOption(null);
    };

    const handleRenameClick = () => {
        setDialogOption(DialogOption.Rename);
        closeContextMenu();
    };

    const handleDeleteClick = () => {
        setDialogOption(DialogOption.Delete);
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
                <MenuItem onClick={handleRenameClick}>Umbennen</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Löschen</MenuItem>
            </Menu>
            <Dialog
                open={!!dialogOption}
                onClose={closeDialog}
            >
                {dialogOption === DialogOption.Delete && (
                    <>
                        <DialogTitle>
                            Aufgaben-Kategorie löschen?
                        </DialogTitle>
                        <DialogContent>
                            Bestehende Aufgaben werden gelöscht.
                        </DialogContent>
                    </>
                )}
                {dialogOption === DialogOption.Rename && (
                    <>
                        <DialogTitle>
                            Aufgaben-Kategorie umbennen
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                color="primary"
                                label="Neuer Name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </DialogContent>
                    </>
                )}
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{ color: 'white' }}
                        onClick={closeDialog}>
                        Abbrechen
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ color: 'white' }}
                        onClick={handleSaveClick}
                    >
                        {dialogOption === DialogOption.Delete && 'Löschen'}
                        {dialogOption === DialogOption.Rename && 'Speichern'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

BoardContextMenu.displayName = 'BoardContextMenu';

export default BoardContextMenu;
