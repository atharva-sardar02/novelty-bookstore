
import '../assets/css/global.css';
import '../assets/css/Home.css'
import {Link} from "react-router-dom";
import {BookItem, CategoryItem} from "../types";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";




function Home() {
    const categories = useContext<CategoryItem[]>(Category);  // add this statment
    const { cart, dispatch } = useContext(CartStore);

    const handleClearCart = () => {
        dispatch({
            type: CartTypes.CLEAR,
            id: -1, // Placeholder value for id
            titles: "", // Placeholder value for titles
            item: {} as BookItem,
        });
    };
    return (

        <div className="home-pages">
            <div className="welcome-text">
                <h2>Welcome Bookworms!!</h2>
                <div>
                    <div className="typewriter">
                        Novelty is a bookstore website that derives its name from the concept of novelty in literature —
                        embracing new and unique works.
                        The platform offers a diverse collection of books, emphasizing fresh and innovative literary works.
                    </div>
                </div>
                <p>
                    <Link to="/categories/Sci-fi" className="header-link-button">
                        <button className="action-button">Shop Now!</button>
                    </Link>
                        {/*<button className="clear-button" onClick={handleClearCart}>Clear Cart</button>*/}
                </p>
            </div>
            <div className="best-seller">
                <h2>Best Sellers!</h2>
                <div className="best-seller-home">
                    <Link to="/">
                        <img
                            src={require('../assets/images/books/a.jpg')}
                            alt="best sellers"
                        />
                    </Link>
                    <Link to="/">
                        <img
                            src={require('../assets/images/books/b.jpg')}
                            alt="best sellers"
                        />
                    </Link>
                    <Link to="/">
                        <img
                            src={require('../assets/images/books/gone-girl.jpg')}
                            alt="best sellers"
                        />
                    </Link>
                    <Link to="/">
                        <img
                            src={require('../assets/images/books/c.jpg')}
                            alt="best sellers"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;
