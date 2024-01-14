import { LoadingState } from '../../types/app.ts';
import { SelectedTaskElement, Task, TaskElementTypes } from '../../types/task.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaskState {
    tasks: Task[];
    loadingState: LoadingState;
    selectedTaskElement?: SelectedTaskElement;
}

const initialState: TaskState = {
    tasks: [],
    loadingState: 'loading',
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, { payload }: PayloadAction<Task[]>) {
            state.tasks = payload;
            state.loadingState = 'successful';
        },
        setLoadingState(state, { payload }: PayloadAction<LoadingState>) {
            state.loadingState = payload;
        },
        updateTask(state, { payload }: PayloadAction<Partial<Task> & { id: number }>) {
            state.tasks = state.tasks.map((task) => {
                if (task.id !== payload.id) {
                    return task;
                }

                const selectedTaskElement = state.selectedTaskElement;

                if (selectedTaskElement && selectedTaskElement.taskId === payload.id) {
                    const { type } = selectedTaskElement;

                    if ((type === TaskElementTypes.Title && typeof payload.title === 'string') ||
                        (type === TaskElementTypes.Text && typeof payload.text === 'string')) {
                        return task;
                    }
                }

                return { ...task, ...payload };
            });

            // if boardId is in payload, move task to end of array
            if (payload.boardId) {
                const task = state.tasks.find((task) => task.id === payload.id);

                if (!task) {
                    return;
                }

                state.tasks = state.tasks.filter((task) => task.id !== payload.id);
                state.tasks.push(task);
            }
        },
        addTask(state, { payload }: PayloadAction<Task>) {
            if (state.tasks.find((task) => task.id === payload.id)) {
                return;
            }

            state.tasks = [...state.tasks, payload];
        },
        removeTask(state, { payload }: PayloadAction<Pick<Task, 'id'>>) {
            state.tasks = state.tasks.filter((task) => task.id !== payload.id);
        },
        setSelectedTaskElement(state, { payload }: PayloadAction<SelectedTaskElement>) {
            state.selectedTaskElement = payload;
        },
        removeSelectedTaskElement(state) {
            state.selectedTaskElement = undefined;
        },
        addUserToTask(state, { payload }: PayloadAction<{ taskId: number, userName: string }>) {
            const task = state.tasks.find((task) => task.id === payload.taskId);

            if (!task || task.assignedUserNames.includes(payload.userName)) {
                return;
            }

            task.assignedUserNames.push(payload.userName);
        },
        removeUserFromTask(state, { payload }: PayloadAction<{ taskId: number, userName: string }>) {
            const task = state.tasks.find((task) => task.id === payload.taskId);

            if (!task) {
                return;
            }

            task.assignedUserNames = task.assignedUserNames.filter((userName) => userName !== payload.userName);
        },
        addLabelIdToTask(state, { payload }: PayloadAction<{ taskId: number, labelId: number }>) {
            const task = state.tasks.find((task) => task.id === payload.taskId);

            if (!task || task.assignedLabelIds.includes(payload.labelId)) {
                return;
            }

            task.assignedLabelIds.push(payload.labelId);
        },
        removeLabelIdFromTask(state, { payload }: PayloadAction<{ taskId: number, labelId: number }>) {
            const task = state.tasks.find((task) => task.id === payload.taskId);

            if (!task) {
                return;
            }

            task.assignedLabelIds = task.assignedLabelIds.filter((labelId) => labelId !== payload.labelId);
        }
    },
});

export const {
    setTasks,
    setLoadingState,
    updateTask,
    addTask,
    removeTask,
    setSelectedTaskElement,
    removeSelectedTaskElement,
    addUserToTask,
    removeUserFromTask,
    addLabelIdToTask,
    removeLabelIdFromTask
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
