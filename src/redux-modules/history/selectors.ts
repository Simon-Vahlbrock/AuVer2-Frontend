import { RootState } from '../index.ts';
import { HistoryState } from './slice.ts';
import { HistoryEntry } from '../../types/history.ts';

const selectHistoryState = (state: RootState): HistoryState => state.history;

export const selectHistoryEntries = (state: RootState): HistoryEntry[] => selectHistoryState(state).historyEntries;

export const selectHistoryEntryOfToday = (state: RootState): HistoryEntry => selectHistoryState(state).historyEntryOfToday;

export const selectHistoryLoadingState = (state: RootState): HistoryState['loadingStatus'] => selectHistoryState(state).loadingStatus;
