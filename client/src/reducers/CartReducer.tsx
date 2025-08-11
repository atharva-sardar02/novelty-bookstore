import {ShoppingCartItem, BookItem, CategoryItem} from "../types";
import {Dispatch, ReducerAction, useContext} from "react";
import {Category} from "../contexts/CategoryContext";
import {CartStore} from "../contexts/CartContext";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR',
};

type AppActions = {
    id :number;
    titles :string;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item : BookItem;
}

const findBook = (carts: any[], id: any)=>carts.find((item)=>item.id===id);

export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {

    switch (action.type) {
        case CartTypes.ADD:
            /*
                The following only added the item in the cart for the first time with quantity 1.
                You have to handle the increment of the quantity if the item
                is already in the cart
              */
            if (findBook(state,action.id)){
                return state.map((item)=>
                item.id===action.id
                ?{...item, titles:action.titles, quantity:item.quantity+1}
                    :item
            );
            }
            return [
                ...state,
                {id: action.id,book:action.item, quantity: 1, titles:action.titles},
            ];
        case CartTypes.REMOVE:
            if (findBook(state, action.id)) {
                return state
                    .map((item) =>
                        item.id === action.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0);
            }
            return state;
        case CartTypes.CLEAR:
            return []
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};

// const existingItem = state.find(item => item.id === action.id);
// if (existingItem) {
//     if (existingItem.quantity === 1) {
//         return state.filter(item => item.id !== action.id);
//     } else if(existingItem.quantity >0) {
//         return state.map(item =>
//             item.id === action.id
//                 ? { ...item, quantity: item.quantity - 1 }
//                 : item
//         );
//     }
// }
// return state;


