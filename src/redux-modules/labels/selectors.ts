import { RootState } from '../index.ts';
import { LabelsState } from './slice.ts';
import { Label } from '../../types/labels.ts';

const selectLabelsState = (state: RootState): LabelsState => state.labels;

export const selectLabels = (state: RootState): Label[] => selectLabelsState(state).labels;

export const selectLabelsLoadingState = (state: RootState): LabelsState['loadingState'] => selectLabelsState(state).loadingState;
