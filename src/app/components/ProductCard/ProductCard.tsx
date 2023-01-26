import { FunctionComponent, useEffect } from "react";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addProduct, removeProduct, selectCart } from "../../../store/cartSlice";
import { Product } from "../../../models/Product";
import Box from '@mui/material/Box';

import currencyFormat from "../CurrencyFormatter/currencyFormatter";

import './ProductCard.scss';

function starsCounter(rating: number) {

    const full = Math.max(Math.floor(rating / 2), 0);
    const half = Math.max(rating % 2, 0);
    const empty = 5 - (full + half);

    const res = {
        full: [...new Array(Math.min(full, 5))],
        half: [...new Array(half)],
        empty: [...new Array(Math.max(empty, 0))]
    };
    return res;
}

const Star: FunctionComponent<any> = ({ type }) => {


    switch (type) {
        case 'full':
            return <BsStarFill color="yellow" />
        case 'empty':
            return <BsStar color="yellow" />
        case 'half':
            return <BsStarHalf color="yellow" />
        default:
            return <BsStar color="yellow" />
    }

}

const ProductCard: FunctionComponent<{ product: Product }> = ({ product }) => {

    const state = useAppSelector(selectCart);
    const dispatch = useAppDispatch();

    const rating = starsCounter(product.stars);

    return (
        <Box sx={{ boxShadow: 2 }} className="ProductCard">
            <img src={product.imgUrl} alt={product.title} />
            <div className="content-container">
                <div className="row">
                    <strong className="title">{product.title}</strong>
                    <div className="rating">
                        {rating.full.map((_, i) => <Star type="full" key={'f' + i}></Star>)}
                        {rating.half.map((_, i) => <Star type="half" key={'h' + i}></Star>)}
                        {rating.empty.map((_, i) => <Star type="empty" key={'e' + i}></Star>)}
                    </div>
                </div>
                <div className="row">
                    <p className="description">{product.description}</p>
                    <p className="price">{currencyFormat(product.price)}</p>
                </div>
                <div className="row align-right">
                    {
                        existsInCart(state.items, product)
                            ? <Button variant="contained" color="error" onClick={() => dispatch(removeProduct(product))}>REMOVE FROM CART</Button>
                            : <Button variant="contained" onClick={() => dispatch(addProduct(product))}>ADD TO CART</Button>
                    }
                </div>
            </div>
        </Box>
    );
}

function existsInCart(cartItems: { product: Product, quantity: number }[], product: Product) {

    return !!cartItems.find(item => item.product.id === product.id);
}

export default ProductCard;