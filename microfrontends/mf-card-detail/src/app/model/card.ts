import { Movement } from './movement';

export interface Card {
    id: number;
    number: string;
    name: string;
    balance: number;
    expires: string;
    type: number;
    movements: Movement[];
}
