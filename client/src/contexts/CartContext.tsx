import React, { createContext, useReducer, useEffect } from "react";
import { BookItem, initialCartState, ShoppingCartItem } from "../types";
import { cartReducer } from "../reducers/CartReducer";

export const CartStore = createContext({
    cart: initialCartState,
    dispatch: (p: { item: BookItem; id: number; type: string; titles: string }) => { },
});

// @ts-ignore
export function CartContext({ children }) {
    const storageKey = 'cart';
    // @ts-ignore
    const [cart, dispatch] = useReducer(cartReducer, initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );

    // Update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }, [cart]);

    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}


// @ts-ignore
//     const [cart, dispatch]=useReducer(cartReducer,initialCartState);
//     return(
//         <CartStore.Provider value={{cart, dispatch}}>
//             {children}
//         </CartStore.Provider>
//     );
// }














// import {createContext, Dispatch, useEffect, useReducer, useState} from "react";
// import {cartReducer, } from "../reducers/CartReducer";
// import { ShoppingCartItem} from "../types";
// import axios from "axios";
// import {Category} from "./CategoryContext";
//
// const initialCartState:ShoppingCartItem[] =  []
// export const CartStore = createContext<{
//     cart: ShoppingCartItem[];
//     dispatch: Dispatch<any>;
// }>({
//     cart: initialCartState,
//     dispatch: () => null
// });
//
// CartStore.displayName = 'CartContext';
//
// // the rest of the code comes here
// // @ts-ignore
// function CartContext ({ children })  {
//     const [cart, dispatch] = useReducer(cartReducer, initialCartState);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         // Fetch cart data from the server or local storage, etc.
//         // For example, fetching initial cart data from an API
//         axios.get('/api/cart')
//             .then(response => {
//                 dispatch({ type: 'INITIALIZE_CART', payload: response.data });
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching cart data:', error);
//                 setLoading(false);
//             });
//     }, []);
//
//     return (
//         <CartStore.Provider value={{ cart, dispatch }}>
//             {!loading && children}
//         </CartStore.Provider>
//     );
// }
// export default CartContext;
