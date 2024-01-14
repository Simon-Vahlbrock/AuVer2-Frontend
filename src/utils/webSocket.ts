import { io } from 'socket.io-client';
import store from '../redux-modules/index';
import { Board } from '../types/boards.ts';
import { updateBoard } from '../redux-modules/boards/slice.ts';
import { Task } from '../types/task.ts';
import {
    addLabelIdToTask,
    addUserToTask,
    removeLabelIdFromTask,
    removeUserFromTask,
    updateTask
} from '../redux-modules/tasks/slice.ts';

export const initWebSocket = () => {
    const socket = io('ws://localhost:3000');

    socket.on('connect', () => {
        console.log('WebSocket connected');
    });

    socket.on('update_board', (data: Board) => {
        store.dispatch(updateBoard(data));
    });

    socket.on('update_task', (data: Partial<Task> & { id: number }) => {
        console.log(data);
        store.dispatch(updateTask(data));
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

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
};

