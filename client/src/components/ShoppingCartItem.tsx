import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import '../assets/css/ShoppingCartItem.css'

function ShoppingCartItem() {
    const {cart} = useContext(CartStore)
    return (

        <>
            <h2>
                Cart
            </h2>
            <table>
                <thead>
                <tr>
                <th>Id</th>
                <th>title</th>
                <th>quantity</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item) => (
                    <tr key={item.id}>
                        <td className="cartitems">{item.id}</td>
                        <td className="cartitems">{item.titles}</td>
                        <td className="cartitems">{item.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default ShoppingCartItem;

// import React, { useContext } from "react";
// import { CartStore } from "../contexts/CartContext";
//
// function ShoppingCartItem() {
//     const { cart } = useContext(CartStore);
//
//     return (
//         <table>
//             <thead>
//             <tr>
//                 <th>Id</th>
//                 <th>Title</th>
//                 <th>Quantity</th>
//             </tr>
//             </thead>
//             <tbody>
//             {cart.map((item) => (
//                 <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.book ? item.book.title : "N/A"}</td>
//                     <td>{item.quantity}</td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//     );
// }
//
// export default ShoppingCartItem;
