import { RootState } from '../index.ts';
import { BoardsState } from './slice.ts';

const selectBoardsState = (state: RootState) => state.boards;

export const selectBoards = (state: RootState): BoardsState['boards'] => selectBoardsState(state).boards;
export const selectBoardsLoadingState = (state: RootState): BoardsState['loadingState'] => selectBoardsState(state).loadingState;
