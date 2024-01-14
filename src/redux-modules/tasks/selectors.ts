import { TaskState } from './slice.ts';
import { RootState } from '../index.ts';
import { selectLabels } from '../labels/selectors.ts';
import { selectAllUsers } from '../user/selectors.ts';

const selectTasksState = (state: RootState): TaskState => state.tasks;

export const selectTasks = (state: RootState): TaskState['tasks'] => selectTasksState(state).tasks;

export const selectTasksLoadingState = (state: RootState): TaskState['loadingState'] => selectTasksState(state).loadingState;

export const selectTaskByBoardId = (state: RootState, boardId: number) => selectTasksBySearchString(state).filter((task) => task.boardId === boardId);
export const selectTaskById = (state: RootState, taskId: number) => selectTasksState(state).tasks.find((task) => task.id === taskId)!;

export const selectSearchString = (state: RootState): TaskState['searchString'] => selectTasksState(state).searchString;

export const selectTasksBySearchString = (state: RootState): TaskState['tasks'] => {
    const searchString = selectSearchString(state);
    const tasks = selectTasks(state);

    if (searchString.trim().length <= 2) {
        return tasks;
    }

    const labels = selectLabels(state);
    const users = selectAllUsers(state);

    const filteredLabels = labels.filter(({ name }) => name.toLowerCase().includes(searchString.toLowerCase()));
    const filteredUsers = users.filter((name) => name.toLowerCase().includes(searchString.toLowerCase()));

    return tasks.filter((
        {
            text,
            title,
            assignedLabelIds,
            assignedUserNames
        }) => title.toLowerCase().includes(searchString.toLowerCase())
        || text.toLowerCase().includes(searchString.toLowerCase())
        || assignedLabelIds.some((id) => filteredLabels.some((label) => label.id === id))
        || assignedUserNames.some((name) => filteredUsers.some((user) => user === name))
    );
};
