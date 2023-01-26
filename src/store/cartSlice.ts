import { ProductCart, ProductTypes } from './../models/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/Product';
import { RootState } from './store';

export interface CartState {
    items: Array<ProductCart>,
    subTotal: number,
    discount: number,
    total: number
}

const initialState: CartState = {
    items: [],
    subTotal: 0,
    discount: 0,
    total: 0
}

const calculateDiscount = (state: CartState): CartState => {

    const items = state.items;

    const subTotal = items.reduce((p, c) => p + (c.product.price * c.quantity), 0);

    /* MILK discount */
    const milk = items.find((productCart) => productCart.product.type === ProductTypes.ProductTypesEnum.Milk);
    const milkQte = milk ? milk.quantity : 0;
    const milkDiscount = milk ? Math.floor(milkQte / 4) * milk?.product.price : 0;

    if (milk) milk.discount = milkDiscount // set new discount to milk

    /* BREAD discount */
    const butter = items.find((productCart) => productCart.product.type === ProductTypes.ProductTypesEnum.Butter);
    const butterQte = butter ? butter.quantity : 0;

    const bread = items.find((productCart) => productCart.product.type === ProductTypes.ProductTypesEnum.Bread);
    const breadQte = bread ? bread.quantity : 0;

    const maxBreadnumber = Math.floor(butterQte / 2); // number of bread that can be discounted
    const breadNumber = Math.min(maxBreadnumber, breadQte); // number of bread that will actually get discounted

    const breadDiscount =
        bread && butter ? // if no bread or butter there is no need to calculate discount
            breadNumber * bread.product.price * 0.5
            : 0;

    if (bread) bread.discount = breadDiscount // set new discount to bread
    if (milk) milk.discount = milkDiscount // set new discount to milk

    const discount = milkDiscount + breadDiscount;

    return { items: [...items], subTotal, discount, total: subTotal - discount };
}

export const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        increment: (state: CartState, Action: PayloadAction<ProductCart>) => {

            const itemsClone = state.items.map(_ => ({ ..._ }));

            const item = itemsClone.find(item => item.product.id === Action.payload.product.id);

            if (item == null || item.quantity < 0) return;

            item.quantity++;

            return calculateDiscount({ ...state, items: itemsClone });
        },
        decrement: (state: CartState, Action: PayloadAction<ProductCart>) => {

            const itemsClone = state.items.map(_ => ({ ..._ }));

            const item = itemsClone.find(item => item.product.id === Action.payload.product.id);

            if (item == null || item.quantity < 1) return;

            item.quantity--;

            return calculateDiscount({ ...state, items: itemsClone });
        },
        addProduct: (state: CartState, action: PayloadAction<Product>) => {

            const productIndex = state.items.findIndex(p => p.product.id === action.payload.id);

            if (productIndex !== -1) return;

            const items: ProductCart[] = [...state.items, { product: action.payload, quantity: 1, discount: 0 }];

            return calculateDiscount({ ...state, items });
        },
        removeProduct: (state: CartState, action: PayloadAction<Product>) => {

            const productIndex = state.items.findIndex(p => p.product.id === action.payload.id);

            if (productIndex === -1) return;

            const items = state.items.filter((_, i) => i !== productIndex);

            return calculateDiscount({ ...state, items });
        },
    }
})

/* expose actions */
export const { addProduct, removeProduct, increment, decrement } = cartSlice.actions;

/* expose selectors */
export const selectCart = (state: RootState) => state.cart;

/* expose reducers */
export default cartSlice.reducer;