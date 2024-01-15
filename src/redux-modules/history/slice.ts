import { HistoryEntry } from '../../types/history.ts';
import { LoadingState } from '../../types/app.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HistoryState {
    historyEntries: HistoryEntry[];
    historyEntryOfToday: HistoryEntry;
    loadingStatus: LoadingState;
    selectedHistoryId?: number;
}

const defaultHistoryEntryOfToday = {
    createdAt: new Date().toISOString(),
    id: -1,
    description: '-'
};

export const initialState: HistoryState = {
    historyEntries: [],
    loadingStatus: 'loading',
    historyEntryOfToday: defaultHistoryEntryOfToday
};


export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistoryEntries: (state, { payload }: PayloadAction<HistoryEntry[]>) => {
            const historyEntryOfToday = payload.find((entry) => {
                const entryDate = new Date(entry.createdAt);
                const today = new Date();

                return entryDate.getFullYear() === today.getFullYear() &&
                    entryDate.getMonth() === today.getMonth() &&
                    entryDate.getDate() === today.getDate();
            });

            state.historyEntries = payload.filter((entry) => entry.id !== historyEntryOfToday?.id);

            if (historyEntryOfToday) {
                state.historyEntryOfToday = historyEntryOfToday;
            }
            state.loadingStatus = 'successful';
        },
        setLoadingStatus: (state, { payload }: PayloadAction<LoadingState>) => {
            state.loadingStatus = payload;
        },
        updateHistoryEntry: (state, { payload }: PayloadAction<Pick<HistoryEntry, 'id' | 'description'>>) => {
            if (state.selectedHistoryId === payload.id) {
                return;
            }

            const historyEntry = state.historyEntries.find(({ id }) => id === payload.id) || state.historyEntryOfToday;

            if (historyEntry) {
                historyEntry.description = payload.description;
            }
        },
        setSelectedHistoryId: (state, { payload }: PayloadAction<number | undefined>) => {
            state.selectedHistoryId = payload;
        },
        setHistoryEntryOfToday: (state, { payload }: PayloadAction<HistoryEntry>) => {
            state.historyEntryOfToday = payload;
        },
        addHistoryEntryViaWebSocket: (state, { payload }: PayloadAction<HistoryEntry>) => {
            if (state.selectedHistoryId === payload.id) {
                return;
            }

            const entryDate = new Date(payload.createdAt);
            const today = new Date();
            const isToday = entryDate.getFullYear() === today.getFullYear() && entryDate.getMonth() === today.getMonth() && entryDate.getDate() === today.getDate();

            if (isToday) {
                state.historyEntryOfToday = payload;
            } else {
                state.historyEntries = [payload, ...state.historyEntries];
            }
        }
    },
});

export const {
    setHistoryEntries,
    setLoadingStatus,
    updateHistoryEntry,
    setSelectedHistoryId,
    setHistoryEntryOfToday,
    addHistoryEntryViaWebSocket
} = historySlice.actions;
export const historyReducer = historySlice.reducer;
