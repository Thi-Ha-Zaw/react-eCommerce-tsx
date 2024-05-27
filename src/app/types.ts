export type Product = {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
    isInCart: boolean;
};
