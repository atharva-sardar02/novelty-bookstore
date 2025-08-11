import React, {useContext} from "react";
import ConfirmationTable from "./ConfirmationTable";
import {useOrderDetails} from "../contexts/OrderDetailContext";
import {asDollarsAndCents} from "./utils";
import "../assets/css/global.css";
import "../assets/css/Confirmation.css";
import cart from "./Cart";
import {CartStore} from "../contexts/CartContext";
import { CartTypes } from "../reducers/CartReducer";
import { BookItem, LineItem} from "../types";

const Confirmation: React.FC = () => {

    // @ts-ignore
    const {state: {orderDetails}} = useOrderDetails();

    if (!orderDetails) {
        return <div>Loading...</div>;
    }


    const {
        order: {confirmationNumber, dateCreated},
        customer: {customerName, email, address, ccNumber, ccExpDate},
        lineItems,
    } = orderDetails;


    function getQuantity(bookId: any) {
        let quantity = 0;

        lineItems.forEach((item) => {
            if (item.bookId == bookId) {
                quantity += item.quantity;
            }

        });

        return quantity;
    }

    function Total(): number {
        let totalAmount = 0;
        lineItems.forEach(lineItem => {
            const book = orderDetails?.books.find(book => book.bookId === lineItem.bookId);
            if (book) {
                totalAmount += lineItem.quantity * book.price;
            }
        });
        return totalAmount;
    }



    // return (<div> confirmation</div>);
    // @ts-ignore
    return (
        // <div>
        //     <h2>Confirmation</h2>
        //     <div>
        //         <p>Confirmation Number: {confirmationNumber}</p>
        //         <p>Date-Time Stamp: {new Date(dateCreated).toLocaleString()}</p>
        //         <p>Customer Name: {customerName}</p>
        //         <p>Email: {email}</p>
        //         <p>Address: {address}</p>
        //         <p>Last Four Digits of Credit Card: ****{ccNumber.slice(-4)}</p>
        //         <p>Expiration Date: {new Date(ccExpDate).toLocaleDateString()}</p>
        //     </div>
        <div className="last">
            <div>
                <h2>Confirmation</h2>
                <table>
                    <tr>
                        <td>Confirmation Number</td>
                        <td>{confirmationNumber}</td>
                    </tr>
                    <tr>
                        <td>Date-Time Stamp</td>
                        <td>{new Date(dateCreated).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>{customerName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{address}</td>
                    </tr>
                    <tr>
                        <td>Last Four Digits of Credit Card</td>
                        <td>****{ccNumber.slice(-4)}</td>
                    </tr>
                    <tr>
                        <td>Expiration Date</td>
                        <td>{new Date(ccExpDate).toLocaleDateString()}</td>
                    </tr>
                </table>
            </div>
            <div>
                <h3>Purchased Items</h3>
                {/*<ConfirmationTable lineItems={lineItems} />*/}
                <table className="confirmation_table">
                    <tr>
                        <th>Title</th>
                        <th>Book ID</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    {
                        orderDetails.books?.map((book, i) => (

                            <tr className="confirmation_tr" key={i}>
                                <td className="confirmation_td">
                                    {book.title}
                                </td>
                                <td className="confirmation_td">{book.bookId}</td>
                                <td className="confirmation_td">{getQuantity(book.bookId)}</td>
                                <td className="confirmation_td">{asDollarsAndCents((book.price) * 100)}</td>
                            </tr>
                        ))}
                    <tr>
                        <td><b>Total :</b></td>
                        <td></td>
                        <td></td>
                        <td>{asDollarsAndCents(Total()*100)}</td>
                    </tr>
                </table>
            </div>
        </div>

    );
};

export default Confirmation;

