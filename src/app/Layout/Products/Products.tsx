import { FunctionComponent, useEffect, useState } from "react";
import axios from 'axios';

import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../../models/Product";

interface ProductsProps {

}

const Products: FunctionComponent<ProductsProps> = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get<any[]>('Products.json')
            .then(res => {
                const prods = res.data;
                setProducts(prods);
            })
    }, []);

    return (
        <>
            <div className="products-container">
                <h2>Products</h2>
                {products.map((p, i) => <ProductCard key={i} product={p} />)}
            </div>
        </>
    );
}

export default Products;