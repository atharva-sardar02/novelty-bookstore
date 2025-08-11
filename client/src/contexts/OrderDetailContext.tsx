

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { OrderDetails } from '../types';

export interface OrderState {
    orderDetails: OrderDetails | null;
}

const initialState: OrderState = {
    orderDetails: null
};

const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS' as const;
const UPDATE_ORDER_DETAILS = 'UPDATE_ORDER_DETAILS' as const;

type OrderActionTypes =
    | { type: typeof CLEAR_ORDER_DETAILS }
    | { type: typeof UPDATE_ORDER_DETAILS, payload: OrderDetails | null };

export const clearOrderDetails = (): OrderActionTypes => ({
    type: CLEAR_ORDER_DETAILS
});

export const updateOrderDetails = (details: OrderDetails | null): OrderActionTypes => ({
    type: UPDATE_ORDER_DETAILS,
    payload: details
});

const orderDetailsReducer = (state: OrderState, action: OrderActionTypes): OrderState => {
    switch (action.type) {
        case CLEAR_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: null
            };
        case UPDATE_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            };
        default:
            return state;
    }
};

const OrderDetailsContext = createContext<{
    state: OrderState;
    dispatch: React.Dispatch<OrderActionTypes>;
}>({
    state: initialState,
    dispatch: () => null
});

export const OrderContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(orderDetailsReducer, initialState);

    return (
        <OrderDetailsContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderDetailsContext.Provider>
    );
};

export const useOrderDetails = () => useContext(OrderDetailsContext);


