export type Product = {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
    isInCart: boolean;
    quantity?: number;
   
};



export type DomRectInfo = {
    width: number;
    height: number;
    top: number;
    left: number;
  
};
