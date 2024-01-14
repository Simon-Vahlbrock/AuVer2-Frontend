export interface Board {
    id: number;
    name: string;
}

export enum BoardPosition {
    First = 'first',
    Last = 'last',
    Any = 'any',
}
