import { io } from 'socket.io-client';
import store from '../redux-modules/index';
import { Board } from '../types/boards.ts';
import { updateBoard } from '../redux-modules/boards/slice.ts';
import { Task } from '../types/task.ts';
import {
    addLabelIdToTask, addTask,
    addUserToTask,
    removeLabelIdFromTask, removeTask,
    removeUserFromTask,
    updateTask
} from '../redux-modules/tasks/slice.ts';
import { addHistoryEntryViaWebSocket, updateHistoryEntry } from '../redux-modules/history/slice.ts';
import { HistoryEntry } from '../types/history.ts';

export const initWebSocket = () => {
    const socket = io('ws://localhost:3000');

    socket.on('connect', () => {
        console.log('WebSocket connected');
    });

    socket.on('update_board', (data: Board) => {
        store.dispatch(updateBoard(data));
    });

    socket.on('update_task', (data: Partial<Task> & { id: number }) => {
        store.dispatch(updateTask(data));
    });

    socket.on('add_task', (data: Task) => {
        store.dispatch(addTask(data));
    });

    socket.on('delete_task', (data: { id: number }) => {
        store.dispatch(removeTask(data));
    });

    socket.on('add_user_to_task', (data: { taskId: number, userName: string }) => {
        store.dispatch(addUserToTask(data));
    });

    socket.on('delete_user_from_task', (data: { taskId: number, userName: string }) => {
        store.dispatch(removeUserFromTask(data));
    });

    socket.on('add_label_id_to_task', (data: { taskId: number, labelId: number }) => {
        store.dispatch(addLabelIdToTask(data));
    });

    socket.on('delete_label_id_from_task', (data: { taskId: number, labelId: number }) => {
        store.dispatch(removeLabelIdFromTask(data));
    });

    socket.on('update_history_entry', (data: { id: number, description: string }) => {
        store.dispatch(updateHistoryEntry(data));
    });

    socket.on('create_history_entry', (data: HistoryEntry) => {
        store.dispatch(addHistoryEntryViaWebSocket(data));
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
};

