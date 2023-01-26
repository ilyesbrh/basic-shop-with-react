import { FunctionComponent, useEffect } from "react";
import { selectCart } from "../../../store/cartSlice";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import CartCard from "../../components/CartCard/CartCard";
import currencyFormat from "../../components/CurrencyFormatter/currencyFormatter";

import './Cart.scss';

const Cart: FunctionComponent<{}> = () => {

    const state = useAppSelector(selectCart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(state)


        return () => {
        }
    }, [state])


    return (
        <>
            <div className="products-container">
                <h2>Cart</h2>
                {state.items.map((p, i) => <CartCard key={i} cartProduct={p} />)}
                <div className="col">
                    <p>
                        Subtotal <br />
                        <strong>{currencyFormat(state.subTotal)}</strong>
                    </p>
                    <p>
                        Discount <br />
                        <strong>{currencyFormat(state.discount)}</strong>
                    </p>
                    <p>
                        Total <br />
                        <strong>{currencyFormat(state.total)}</strong>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Cart;