import { FC, useCallback, useEffect, useState } from 'react';
import { RootState } from '../../../../../../../redux-modules';
import { selectTaskById } from '../../../../../../../redux-modules/tasks/selectors.ts';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks/redux.ts';
import { selectLabels } from '../../../../../../../redux-modules/labels/selectors.ts';
import { saveAssignedLabelsUpdate } from '../../../../../../../redux-modules/tasks/actions.ts';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material';

interface LabelsDialogProps {
    isOpen: boolean;
    closeDialog: VoidFunction;
    id: number;
}

const LabelsDialog: FC<LabelsDialogProps> = ({ closeDialog, isOpen, id }) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const taskSelector = useCallback((state: RootState) => selectTaskById(state, id), [id]);

    const { assignedLabelIds } = useAppSelector(taskSelector);
    const labels = useAppSelector(selectLabels);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setSelectedItems(assignedLabelIds);
    }, [assignedLabelIds]);

    const handleCheckboxChange = (labelId: number) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(labelId)) {
                return prevSelected.filter((selectedItem) => selectedItem !== labelId);
            } else {
                return [...prevSelected, labelId];
            }
        });
    };

    const handleCancelClick = () => {
        setSelectedItems(assignedLabelIds);
        closeDialog();
    };

    const handleSaveClick = () => {
        void dispatch(saveAssignedLabelsUpdate({ selectedLabelIds: selectedItems, taskId: id }));

        closeDialog();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleCancelClick}
        >
            <DialogTitle>
                Labels zuweisen
            </DialogTitle>
            <DialogContent>
                {labels.map((label) => (
                    <FormControlLabel
                        key={label.id}
                        control={
                            <Checkbox
                                checked={selectedItems.includes(label.id)}
                                onChange={() => handleCheckboxChange(label.id)}
                            />
                        }
                        label={label.name}
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

LabelsDialog.displayName = 'LabelsDialog';

export default LabelsDialog;
