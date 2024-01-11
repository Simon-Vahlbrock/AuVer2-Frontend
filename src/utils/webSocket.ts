import { io } from 'socket.io-client';
import store from '../redux-modules/index';
import { Board } from '../types/boards.ts';
import { updateBoard } from '../redux-modules/boards/slice.ts';
import { Task } from '../types/task.ts';
import { updateTask } from '../redux-modules/tasks/slice.ts';

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

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
};

