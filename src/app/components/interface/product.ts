import { Key } from "react";

export default interface Product {
    [x: string]: Key | null | undefined;
    id: string;
    name: string;
    imagePath: string;
    price: number;
    description: string;
    discountPercentage: number;
    isFeaturedProduct: boolean;
    stockLevel: number;
    category: string;
  }