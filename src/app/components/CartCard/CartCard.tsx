import { FunctionComponent } from "react";

import './CartCard.scss';

import { useAppDispatch } from "../../../store/hooks";
import { decrement, increment } from "../../../store/cartSlice";
import { Product, ProductCart } from "../../../models/Product";
import UpDownNumberInput from "../UpDownNumberInput/UpDownNumberInput";
import currencyFormat from "../CurrencyFormatter/currencyFormatter";

const CartCard: FunctionComponent<{ cartProduct: ProductCart }> = ({ cartProduct }) => {

    const dispatch = useAppDispatch();

    const handleChangeEvent = (i: boolean) => {
        dispatch(i ? increment(cartProduct) : decrement(cartProduct))
    }

    return (
        <>
            <div className="CartCard">
                <img src={cartProduct.product.imgUrl} alt={cartProduct.product.title} />
                <div className="content-container">
                    <div className="row">
                        <strong className="title">{cartProduct.product.title}</strong>
                        <div className="prices">
                            {
                                cartProduct.discount > 0
                                    ? <span className="old-price">
                                        {currencyFormat((cartProduct.quantity * cartProduct.product.price))}
                                    </span>
                                    : <></>
                            }
                            <span className="price">
                                {currencyFormat((cartProduct.quantity * cartProduct.product.price) - cartProduct.discount)}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <UpDownNumberInput
                            label="Quantity"
                            value={cartProduct.quantity}
                            min={0}
                            max={10}
                            onChange={handleChangeEvent}
                        ></UpDownNumberInput>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}

function existsInCart(cartItems: { product: Product, quantity: number }[], product: Product) {

    return !!cartItems.find(item => item.product.id === product.id);
}

export default CartCard;