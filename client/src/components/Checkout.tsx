import "../assets/css/checkout.css";
import {BookItem, CustomerForm, months, OrderDetails, years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {isCreditCard, isMobilePhone, isvalidEmail} from "./utils";
import axios from "axios";
import { updateOrderDetails, useOrderDetails} from "../contexts/OrderDetailContext";

function CheckoutPage() {
    const {cart, dispatch} = useContext(CartStore);
    const { state: orderDetails, dispatch: orderDispatch } = useOrderDetails();
    const navigate = useNavigate();

    const bookImageFileName = (book: BookItem) => {
        let name = book.title.toLowerCase();
        name = name.replace(/ /g, "-");
        name = name.replace(/'/g, "");
        return `${name}.jpg`;
    };

    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const cartTotalPrice = cart.reduce((total, item) => total + (item.book?.price * item.quantity || 0), 0).toFixed(2);
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCcNumberError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: 0,
        ccExpiryYear: 0
    });

    const [checkoutStatus, setCheckoutStatus] = useState("");

    // function isValidForm() {
    //     return !nameError && !addressError && !phoneError && !emailError && !ccNumberError;
    // }
    function isValidForm() {
        const isNameValid = !(formData.name.trim() === "");
        const isAddressValid = !(formData.address.trim() === "");
        const isPhoneValid = !(formData.phone.trim() === "");
        const isEmailValid = !(formData.email.trim() === "");
        const isCcNumberValid = !(formData.ccNumber.trim() === "");

        return isNameValid && isAddressValid && isPhoneValid && isEmailValid && isCcNumberValid &&
            !nameError && !addressError && !phoneError && !emailError && !ccNumberError;
    }

    // function placeOrder() {
    //     setCheckoutStatus('PENDING');
    //     setTimeout(() => {
    //         setCheckoutStatus('OK');
    //     }, 2000);
    // }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        switch (name) {
            case 'name':
                value.length < 4 || value.length > 45 ? setNameError("Name must be between 4 and 45 characters!") : setNameError("");
                break;
            case 'address':
                value.length < 4 || value.length > 45 ? setAddressError("Address must be between 4 and 45 characters!") : setAddressError("");
                break;
            case 'phone':
                !isMobilePhone(value) ? setPhoneError("Invalid phone number!") : setPhoneError("");
                break;
            case 'email':
                !isvalidEmail(value) ? setEmailError("Invalid email format!") : setEmailError("");
                break;
            case 'ccNumber':
                !isCreditCard(value) ? setCcNumberError("Invalid credit card number!") : setCcNumberError("");
                break;
            default:
                break;
        }
    }

    async function submitOrder(event: FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect = isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if (orders) {
                orderDispatch(updateOrderDetails(orders))
                setCheckoutStatus("OK");
                navigate('/confirmation');
            } else {
                console.log("Error placing order");
            }

        }
    }


    const placeOrder = async (customerForm: CustomerForm) => {

        const order = {customerForm: customerForm, cart: {itemArray: cart}};

        const orders = JSON.stringify(order);
        // console.log(orders);     //you can uncomment this to see the orders JSON on the console
        const url = 'api/orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({
                    type: CartTypes.CLEAR, id: -1,
                    titles: "",
                    item: {} as BookItem,
                });
                return response.data;
            })
            .catch((error) => console.log(error));
        console.log("order deatils: ", orderDetails);
        return orderDetails;
    }

    const taxRate = 0.18;
    const taxAmount = (parseFloat(cartTotalPrice) * taxRate).toFixed(2);
    const totalPriceWithTax = (parseFloat(cartTotalPrice) + parseFloat(taxAmount)).toFixed(2);

    return (
        <section className="checkout-cart-table-view">
            <div className="checkout-page-body">
                <div>
                    {cart.length === 0 ? (
                        <div className="empty-cart-message">
                            <p>Your cart is empty. Please add items to your cart to checkout.</p>
                            <button onClick={() => navigate('/categories/Sci-fi')}>Continue Shopping</button>
                        </div>
                    ) : (
                        <div>
                            <div className="checkout-form-box">
                                <form className="checkout-form" onSubmit={(event) => submitOrder(event)} method="post">
                                    <div>
                                        <label htmlFor="fname">Name</label>
                                        <div>
                                            <input type="text" size={20} name="name" id="fname" value={formData.name}
                                                   onChange={handleInputChange}/>
                                            {nameError && <div className="error">{nameError}</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <div>
                                            <input type="text" size={50} name="address" id="address"
                                                   value={formData.address} onChange={handleInputChange}/>
                                            {addressError && <div className="error">{addressError}</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <div>
                                            <input type="text" size={15} name="phone" id="phone" value={formData.phone}
                                                   onChange={handleInputChange}/>
                                            {phoneError && <div className="error">{phoneError}</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <div>
                                            <input type="text" size={30} name="email" id="email" value={formData.email}
                                                   onChange={handleInputChange}/>
                                            {emailError && <div className="error">{emailError}</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="ccNumber">Credit Card Number</label>
                                        <div>
                                            <input type="text" size={20} name="ccNumber" id="ccNumber"
                                                   value={formData.ccNumber} onChange={handleInputChange}/>
                                            {ccNumberError && <div className="error">{ccNumberError}</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="ccExpiryMonth">Exp Date</label>
                                        <div>
                                            <select className="credit-card-input" style={{color: 'black'}}
                                                    name="ccExpiryMonth"
                                                    value={formData.ccExpiryMonth} onChange={handleInputChange}>
                                                {months.map((month, i) => (
                                                    <option key={i} value={i + 1}>{month}</option>
                                                ))}
                                            </select>
                                            <select className="credit-card-input" style={{color: 'black'}}
                                                    name="ccExpiryYear"
                                                    value={formData.ccExpiryYear} onChange={handleInputChange}>
                                                {years.map((year, i) => (
                                                    <option key={i} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="checkout-box">
                                <div>Total Quantity: {cartQuantity}</div>
                                <div>Total Price: ${cartTotalPrice}</div>
                                <div>Tax (18%): ${taxAmount}</div>
                                <div>Total Price with Tax: ${totalPriceWithTax}</div>
                                <button onClick={submitOrder}>Complete Purchase</button>
                            </div>
                            <div>
                                {checkoutStatus !== '' ? (
                                    <section className="checkoutStatusBox">
                                        {checkoutStatus === 'ERROR' ? (
                                            <div>Error: Please fix the problems above and try again.</div>
                                        ) : checkoutStatus === 'PENDING' ? (
                                            <div>Processing...</div>
                                        ) : checkoutStatus === 'OK' ? (
                                            <div>Order placed...</div>
                                        ) : (
                                            <div>An unexpected error occurred, please try again.</div>
                                        )}
                                    </section>
                                ) : null}
                            </div>
                        </div>
                    )}
                </div>
                <div className="checkout-cart-info">
                    {cart?.map((item, i) => (
                        <div className="checkout-cart-book-item" key={i}>
                            <div className="checkout-cart-book-image">
                                <img src={require("../assets/images/books/" + bookImageFileName(item.book))} alt="title"
                                     className="checkout-cart-info-img" width="20%" height="20%"/>
                            </div>
                            <div className="checkout-cart-book-info">
                                <div
                                    className="checkout-cart-book-title">{item.book.title.length > 30 ? `${item.book.title.substring(0, 20)}...` : item.book.title}</div>
                                <div className="checkout-cart-book-quantity">
                                    <button className="checkout-icon-button dec-button" onClick={() => dispatch({
                                        item: item.book,
                                        id: item.book.bookId,
                                        type: 'REMOVE',
                                        titles: item.book.title
                                    })}>
                                        <i className="fas fa-minus-circle"><FontAwesomeIcon icon={faMinusCircle}/></i>
                                    </button>
                                    <button className="checkout-num-button">{item.quantity}</button>
                                    <button className="checkout-icon-button inc-button" onClick={() => dispatch({
                                        item: item.book,
                                        id: item.book.bookId,
                                        type: 'ADD',
                                        titles: item.book.title
                                    })}>
                                        <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle}/></i>
                                    </button>
                                </div>
                                <div
                                    className="checkout-cart-book-subtotal">${(item.book?.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CheckoutPage;
