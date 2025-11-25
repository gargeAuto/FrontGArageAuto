export type Customer = {
    id: number | string;
    name: string;
    surname?: string | null;
    email: string;
    cars: {
        id: number | string;
        model: string;
        immat: string;
    }[];
};