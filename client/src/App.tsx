import React, {useEffect, useState} from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Checkout from "./components/Checkout";
import Cart from './components/Cart';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import backgroundImage from './assets/images/site/vintage-crumpled-paper-textured-background.jpg';
import ConfirmationPage from "./components/Confirmation";
import Confirmation from "./components/Confirmation";
// import axios from "axios";
// import ShoppingCartItem from "./components/ShoppingCartItem";



function App() {
    const containerStyle: React.CSSProperties = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    };



    // @ts-ignore
    return (
                <Router basename ={"AtharvaBookstoreReactTransact"}>
                    <div style={containerStyle}>
                        <AppHeader/>
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/cart" element={<Cart/>}></Route>
                            <Route path="/checkout" element={<Checkout/>}></Route>
                            <Route path="/confirmation" element={<Confirmation/>}></Route>
                            <Route path="/categories" element={<CategoryBookList/>} >
                                <Route path=":id" element={<CategoryBookList/>} />
                            </Route>

                            <Route path="*" element={<div>Page Not Found</div>} />
                        </Routes>
                        <AppFooter/>
                    </div>
                </Router>
    );
}

export default App;