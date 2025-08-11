import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import {Link} from 'react-router-dom';
import {CategoryItem} from "../types";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";
import {CartStore} from "../contexts/CartContext";

interface AppHeaderProps {
    catList: any[]
}

function AppHeader() {
    const categories = useContext<CategoryItem[]>(Category);
    const {cart} = useContext(CartStore);
    const calculateTotalQuantity = () => {
        if (cart.length === 0) {
            return 0; // Return zero if cart is empty
        }
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (

        <header className="header-flex">
            <section className="bookstore-logo">
                <Link to="/">
                    <img
                        src={require('../assets/images/site/bookstore-logo.jpg')}
                        alt="AtharvaBookstoreReact Logo"
                        width="150px"
                        height="auto"
                        className="logo"
                    />
                </Link>
            </section>
            <section className="title">
                <h1>
                    <Link to="/" className="text-logo"> Novelty </Link>
                </h1>
            </section>
            <section>
                <form className="same-line" action="">
                    <div className="search-container">
                        <input type="text" className="search-bar" placeholder="Search..."/>
                        <Link to="/" className="search-icon-link">
                            <img
                                src={require('../assets/images/site/search-icon.png')}
                                alt="search icon"
                                className="search-icon"
                            />
                        </Link>
                    </div>
                </form>
                <section className="same-line-buttons">
                    <Link to="/" className="header-link-button">
                        <button className="button">Home</button>
                    </Link>
                    <div>
                        <HeaderDropdown/>
                    </div>
                    <Link to="/" className="header-link-button">
                        <button className="button">E-books</button>
                    </Link>
                </section>
            </section>
            <section className="cart-login">
                {/*<section className="image-button-header">*/}
                {/*    <Link to={"/cart"}>*/}
                {/*        <img*/}
                {/*            src={require('../assets/images/site/cart.png')}*/}
                {/*            alt="cart button"*/}
                {/*        />*/}

                {/*    </Link>*/}
                {/*</section>*/}
                <section className="image-button-header">
                    <Link to={"/cart"}>
                        <div className="cart-icon-container">
                            <img
                                src={require('../assets/images/site/cart.png')}
                                alt="cart button"
                            />
                            <span className="cart-item-count">{calculateTotalQuantity()}</span>
                        </div>
                    </Link>
                </section>
                <Link to="/" className="header-link-button">
                    <form className="same-line" action="">
                        <button className="button">
                            Login
                            <img
                                src={require('../assets/images/site/login.png')}
                                alt="login button"
                            />
                        </button>
                    </form>
                </Link>
            </section>
        </header>
    )
}

export default AppHeader;

