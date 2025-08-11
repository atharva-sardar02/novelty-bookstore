import React, { useContext } from "react";
import { CartStore } from "../contexts/CartContext";
import { CartTypes } from "../reducers/CartReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import '../assets/css/CartTable.css';
import { BookItem, ShoppingCartItem } from "../types";


function CartTable() {
    const { cart, dispatch } = useContext(CartStore);

    const bookImageFileName = (book: BookItem) => {
        let name = book.title.toLowerCase();
        name = name.replace(/ /g, "-");
        name = name.replace(/'/g, "");
        return `${name}.jpg`;
    };

    const handleQuantityChange = (itemId: any, titles: any, item: any, type: any) => {
        dispatch({
            type: type,
            id: itemId,
            titles: titles,
            item: item
        });
    };

    if (cart.length === 0) {
        return null;
    }

    // Calculate subtotal
    const subtotal = cart.reduce((acc: number, item: ShoppingCartItem) => {
        return acc + (item.book?.price * item.quantity);
    }, 0);




    return (
        <div className="cart-table">
            <ul className="cart2">
                <li className="table-heading">
                    <div className="heading-book">Book</div>
                    <div className="heading-price">Price / Quantity</div>
                    <div className="heading-subtotal">Amount</div>
                </li>
                {cart.map((item, index) => (
                    <li key={item.id}>
                        <div className="cart-book-image">
                            <img
                                src={require("../assets/images/books/" + bookImageFileName(item.book))}
                                alt="book.title"
                            />
                        </div>
                        <div className="cart-book-title">{item.titles}</div>
                        <div className="cart-book-price">${item.book?.price}</div>
                        <div className="cart-book-quantity">
                            <button
                                className="icon-button dec-button"
                                onClick={() => handleQuantityChange(item.id, item.titles, item, CartTypes.REMOVE)}
                            >
                                <FontAwesomeIcon icon={faMinusCircle}/>
                            </button>
                            <span className="quantity">{item.quantity}</span>&nbsp;
                            <button
                                className="icon-button inc-button"
                                onClick={() => handleQuantityChange(item.id, item.titles, item, CartTypes.ADD)}
                            >
                                <FontAwesomeIcon icon={faPlusCircle}/>
                            </button>
                        </div>
                        <div className="cart-book-subtotal">${(item.book?.price * item.quantity).toFixed(2)}</div>
                    </li>
                ))}
                <li className="line-sep"></li>
            </ul>
        </div>
    );
}

export default CartTable;


// const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>, itemId: number, titles: string, item: any) => {
//     const newQuantity = parseInt(e.target.value);
//     const currentItem = cart.find(item => item.id === itemId);
//     const currentQuantity = currentItem ? currentItem.quantity : 0;
//
//     // If the new quantity is greater than the current quantity, dispatch ADD action multiple times
//     if (newQuantity > currentQuantity) {
//         for (let i = currentQuantity + 1; i <= newQuantity; i++) {
//             dispatch({
//                 type: CartTypes.ADD,
//                 id: itemId,
//                 titles: titles,
//                 item: item
//             });
//         }
//     }
//     // If the new quantity is less than the current quantity, dispatch REMOVE action multiple times
//     else if (newQuantity < currentQuantity) {
//         for (let i = currentQuantity; i > newQuantity; i--) {
//             dispatch({
//                 type: CartTypes.REMOVE,
//                 id: itemId,
//                 titles: titles,
//                 item: item
//             });
//         }
//     }
// };


//     <div className="cart-table">
//         <ul className = "cart2">
//             <li className="table-heading">
//                 <div className="heading-book">Book</div>
//                 <div className="heading-price">Price / Quantity</div>
//                 <div className="heading-subtotal">Amount</div>
//             </li>
//             <tbody>
//             {cart.map((item, index) => (
//                 <tr key={item.id}>
//                     <td>
//                         <div className="cart-book-info">
//                             <div className="cart-book-image">
//                                 <img
//                                     src={require(`../assets/images/books/${bookImageFileName(item.titles)}`)}
//                                     alt={item.titles}
//                                 />
//                             </div>
//                             <div className="cart-book-title">{item.titles}</div>
//                         </div>
//                     </td>
//                     <td>${item.price}</td>
//                     <td>
//                         <div className="cart-book-quantity">
//                             <select
//                                 id={`quantity-${item.id}`}
//                                 value={item.quantity}
//                                 onChange={(e) => handleQuantityChange(e, item.id, item.titles as string, item)}
//                             >
//                                 {Array.from({ length: 11 }).map((_, qty) => (
//                                     <option key={qty} value={qty}>Qty: {qty}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </td>
//                     <td>${(item.price * item.quantity).toFixed(2)}</td>
//                 </tr>
//             ))}
//             </tbody>
//         <div>
//             <button className="button">Clear</button>
//         </div>
//         </ul>
//     </div>
//
// );