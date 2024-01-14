import { TaskState } from './slice.ts';
import { RootState } from '../index.ts';

const selectTasksState = (state: RootState): TaskState => state.tasks;

export const selectTasks = (state: RootState): TaskState['tasks'] => selectTasksState(state).tasks;

export const selectTasksLoadingState = (state: RootState): TaskState['loadingState'] => selectTasksState(state).loadingState;

export const selectTaskByBoardId = (state: RootState, boardId: number) => selectTasksState(state).tasks.filter((task) => task.boardId === boardId);
export const selectTaskById = (state: RootState, taskId: number) => selectTasksState(state).tasks.find((task) => task.id === taskId)!;
