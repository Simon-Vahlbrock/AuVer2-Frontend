import { LoadingState } from '../../types/app.ts';
import { Label } from '../../types/labels.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LabelsState {
    labels: Label[];
    loadingState: LoadingState;
}

const initialState: LabelsState = {
    labels: [],
    loadingState: 'loading',
};

const labelsSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {
        setLabels(state, { payload }: PayloadAction<Label[]>) {
            state.labels = payload;
            state.loadingState = 'successful';
        },
        setLoadingState(state, { payload }: PayloadAction<LoadingState>) {
            state.loadingState = payload;
        },
        addLabel(state, { payload }: PayloadAction<Label>) {
            state.labels.push(payload);
        },
        updateLabel(state, { payload }: PayloadAction<Label>) {
            state.labels = state.labels.map((label) => label.id !== payload.id ? label : payload);
        },
        deleteLabel(state, { payload }: PayloadAction<number>) {
            state.labels = state.labels.filter((label) => label.id !== payload);
        }
    },
});

export const { setLabels, setLoadingState, addLabel, updateLabel, deleteLabel } = labelsSlice.actions;
export const labelsReducer = labelsSlice.reducer;
