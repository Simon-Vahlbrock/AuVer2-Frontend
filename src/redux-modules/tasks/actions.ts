import { getTasks } from '../../api/tasks/get.ts';
import { AppDispatch, GetAppState } from '../index.ts';
import { selectUserAccessToken } from '../user/selectors.ts';
import { addTask, removeTask, setTasks, updateTask } from './slice.ts';
import { patchTask } from '../../api/tasks/patch.ts';
import { selectTaskById } from './selectors.ts';
import { postLabelIdToTask, postTask, postUserToTask } from '../../api/tasks/post.ts';
import { deleteLabelIdFromTask, deleteTask, deleteUserFromTask } from '../../api/tasks/delete.ts';
import { selectBoards } from '../boards/selectors.ts';

export const loadTasks = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status, data } = await getTasks({ accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setTasks(data));
};

interface SaveTaskUpdate {
    id: number;
    title?: string;
    text?: string;
}

export const saveTaskUpdate = (
    {
        id,
        title,
        text
    }: SaveTaskUpdate) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status } = await patchTask({ id, title, accessToken, text });

    if (status !== 200) {
        return;
    }
};

interface SaveAssignedUsersUpdateProps {
    taskId: number;
    selectedUsers: string[];
}

export const saveAssignedUsersUpdate = (
    {
        selectedUsers,
        taskId
    }: SaveAssignedUsersUpdateProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectUserAccessToken(state);
    const { assignedUserNames } = selectTaskById(state, taskId)!;

    // Put users who are not in the selectedUsers array in the removedUsers array
    const removedUsers = assignedUserNames.filter((userName) => !selectedUsers.includes(userName));
    // Put users who are not in the assignedUserNames array in the addedUsers array
    const addedUsers = selectedUsers.filter((userName) => !assignedUserNames.includes(userName));

    const addPromises = addedUsers.map((userName) => postUserToTask({ taskId: taskId, userName, accessToken }));
    const removePromises = removedUsers.map((userName) => deleteUserFromTask({
        taskId: taskId,
        userName,
        accessToken
    }));

    const addResults = await Promise.all(addPromises);
    const removeResults = await Promise.all(removePromises);

    dispatch(updateTask({ id: taskId, assignedUserNames: selectedUsers }));
};

interface SaveAssignedLabelsUpdateProps {
    taskId: number;
    selectedLabelIds: number[];
}

export const saveAssignedLabelsUpdate = (
    {
        selectedLabelIds,
        taskId
    }: SaveAssignedLabelsUpdateProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectUserAccessToken(state);
    const { assignedLabelIds } = selectTaskById(state, taskId)!;

    // Put labels that are not in the selectedLabelIds array in the removedLabels array
    const removedLabelIds = assignedLabelIds.filter((labelId) => !selectedLabelIds.includes(labelId));
    // Put labels that are not in the assignedLabelIds array in the addedLabels array
    const addedLabelIds = selectedLabelIds.filter((labelId) => !assignedLabelIds.includes(labelId));

    const addPromises = addedLabelIds.map((labelId) => postLabelIdToTask({ taskId: taskId, labelId, accessToken }));
    const removePromises = removedLabelIds.map((labelId) => deleteLabelIdFromTask({
        taskId: taskId,
        labelId,
        accessToken
    }));

    const addResults = await Promise.all(addPromises);
    const removeResults = await Promise.all(removePromises);

    dispatch(updateTask({ id: taskId, assignedLabelIds: selectedLabelIds }));
};

interface SavePostAddProps {
    title: string;
    text: string;
    boardId: number;
}

export const savePostAdd = (
    {
        boardId, title, text
    }: SavePostAddProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status, data } = await postTask({ title, text, boardId, accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(addTask({ ...data, assignedLabelIds: [], assignedUserNames: [] }));
};

interface SaveTaskRemoveProps {
    taskId: number;
}

export const saveTaskRemove = ({ taskId }: SaveTaskRemoveProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectUserAccessToken(getState());

    const { status } = await deleteTask({ taskId, accessToken });

    if (status !== 200) {
        return;
    }

    dispatch(removeTask({ id: taskId }));
};

interface SaveBoardIdOfTaskUpdateProps {
    taskId: number;
    boardId: number;
    goNext: boolean; // If true, move task to next board. If false, move task to previous board.
}

export const saveBoardIdOfTaskUpdate = (
    {
        taskId,
        boardId,
        goNext
    }: SaveBoardIdOfTaskUpdateProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectUserAccessToken(state);
    const boards = selectBoards(state);

    const currentBoardIdIndex = boards.findIndex((board) => board.id === boardId);

    let newBoardId: number;

    if (goNext) {
        newBoardId = boards[currentBoardIdIndex + 1].id;
    } else {
        newBoardId = boards[currentBoardIdIndex - 1].id;
    }

    const { status } = await patchTask({ id: taskId, boardId: newBoardId, accessToken });

    if (status !== 200) {
        return;
    }

    dispatch(updateTask({ id: taskId, boardId: newBoardId }));
};
