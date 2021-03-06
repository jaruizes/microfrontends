import { Movement } from './movement';

export interface Customer {
    id: string;
    name: string;
    age: number;
    entry: string;
    balance: number;
    lastmovements: Movement[];
}
