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
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
            state.loadingState = 'successful';
        },
        setLoadingState(state, action: PayloadAction<LoadingState>) {
            state.loadingState = action.payload;
        },
        updateTask(state, {payload}: PayloadAction<Partial<Task> & { id: number }>) {
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
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks = [...state.tasks, action.payload];
        },
        deleteTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        setSelectedTaskElement(state, action: PayloadAction<SelectedTaskElement>) {
            console.log(1, action.payload);
            state.selectedTaskElement = action.payload;
        },
        removeSelectedTaskElement(state) {
            state.selectedTaskElement = undefined;
        }
    },
});

export const {
    setTasks,
    setLoadingState,
    updateTask,
    addTask,
    deleteTask,
    setSelectedTaskElement,
    removeSelectedTaskElement,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
