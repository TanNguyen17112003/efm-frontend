interface Challenge {
    _id: string;
    category: string;
    name: string;
    description: string;
    target: number;
    current: number;
    date: Date;
    attendants: Array<number>;
    requests: Array<string>;
    createdBy: string;
}