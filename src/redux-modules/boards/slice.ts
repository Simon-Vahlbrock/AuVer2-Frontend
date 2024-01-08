import { Board } from '../../types/boards.ts';
import { LoadingState } from '../../types/app.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BoardsState {
    boards: Board[];
    loadingState: LoadingState;
}

const initialState: BoardsState = {
    boards: [],
    loadingState: 'loading',
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setBoards(state, action: PayloadAction<Board[]>) {
            state.boards = action.payload;
            state.loadingState = 'successful';
        },
        setLoadingState(state, action: PayloadAction<LoadingState>) {
            state.loadingState = action.payload;
        },
    },
});

export const { setBoards, setLoadingState } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
