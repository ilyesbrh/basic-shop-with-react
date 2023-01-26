export interface Product {
    id: number;
    title: string;
    type: ProductTypes.ProductTypesEnum;
    imgUrl: string;
    description: string;
    stars: number;
    price: number;
}

export interface ProductCart {

    product: Product;
    quantity: number;
    discount:number;
}

export namespace ProductTypes {
    export type ProductTypesEnum = 'butter' | 'bread' | 'milk';
    export const ProductTypesEnum = {
        Butter: 'butter' as ProductTypesEnum,
        Bread: 'bread' as ProductTypesEnum,
        Milk: 'milk' as ProductTypesEnum,
    };
}