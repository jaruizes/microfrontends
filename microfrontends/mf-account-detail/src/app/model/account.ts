import { Movement } from './movement';

export interface Account {
    id: number;
    number: string;
    name: string;
    holder: string;
    balance: number;
    available: number;
    lastmovement: string;
    newmovements: string;
    movements: Movement[];
}
