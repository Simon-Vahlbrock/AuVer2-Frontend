import { UserState } from '../redux-modules/user/slice.ts';

export interface Task {
    title: string;
    text: string;
    boardId: number;
    id: number;
    assignedUserNames: UserState['userName'];
    assignedLabelIds: number[];
}

export enum TaskElementTypes {
    Title= 1,
    Text,
}

export interface SelectedTaskElement {
    taskId: number;
    type: TaskElementTypes;
}
