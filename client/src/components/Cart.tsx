import { useContext } from "react";
import { CartStore } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { CartTypes } from "../reducers/CartReducer";
import { BookItem } from "../types";
import "../assets/css/global.css";
import "../assets/css/cart.css";
import CartTable from "./CartTable";

function Cart() {
    const { cart, dispatch } = useContext(CartStore);
    const navigate = useNavigate();

    const handleClearCart = () => {
        dispatch({
            type: CartTypes.CLEAR,
            id: -1, // Placeholder value for id
            titles: "", // Placeholder value for titles
            item: {} as BookItem,
        });
    };

    const totalBooksInCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);

    const handleContinueShopping = () => {
        navigate(-1);
    };

    const subtotal = cart.reduce((acc, curr) => acc + curr.book?.price * curr.quantity, 0).toFixed(2);

    return (
        <div>
            <h2>Cart Page</h2>
            <div className="cart-box">
                <div>
                    <CartTable />
                    {totalBooksInCart > 0 && (
                        <button className="clear-button" onClick={handleClearCart}>Clear Cart</button>
                    )}
                </div>
                <div>
                    <div className="cart-text">
                        {totalBooksInCart === 0 ? (
                            <span>Your cart is empty</span>
                        ) : (
                            <span>You have {totalBooksInCart} {totalBooksInCart === 1 ? 'book' : 'books'} in the cart</span>
                        )}
                        <div>
                            {totalBooksInCart > 0 && <div className="subtotal">Subtotal: ${subtotal}</div>}
                        </div>
                    </div>

                    <div className="cart-flex">
                        {totalBooksInCart > 0 && (
                            <div>
                                <Link to="/checkout">
                                    <button className="action-button">Proceed Checkout</button>
                                </Link>
                            </div>
                        )}
                        <div>
                            <button className="bin-button" onClick={handleContinueShopping}>Continue Shopping</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
