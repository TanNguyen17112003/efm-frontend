interface User {
    id: string;
    name: string;
    image: string;
    sent: any;
}

interface Request {
    _id: string;
    from: {
        _id: string;
        name: string;
    };
    to: string;
    accepted: boolean;
    createdAt: string;
    __v: number;
    image: any;
   
}

interface Friend {
    _id: string;
    name: string;
}