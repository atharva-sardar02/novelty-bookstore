import '../assets/css/CategoryBookListItem.css';
import "../types";
import {BookItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";

const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};

const CategoryBookListItem = (props:BookItem) => {
    const { dispatch } = useContext(CartStore);

    const addBookToCart = () => {
        dispatch({titles:props.title, type: CartTypes.ADD, item: props, id: props.bookId });
    };
    const removeBookToCart = () => {
        dispatch({titles:props.title, type: CartTypes.REMOVE, item: props, id: props.bookId });
    };



    return (
        <li className="book-box">
            <div className="book-image">
                <img
                    src={require("../assets/images/books/" + bookImageFileName(props))}
                    alt="book.title"
                />
                {props.isPublic && <button className="read-now-button">Read</button>}
            </div>
            <div className="book-data">
                <div className="book-title">{props.title}</div>
                <div className="book-author">{props.author}</div>
                <div className="book-price">${(props.price ).toFixed(2)}</div>
                <button className="button" onClick={addBookToCart}>
                    Add to Cart
                </button>
                {/*<button className="button" onClick={removeBookToCart}>*/}
                {/*    Remove*/}
                {/*</button>*/}
            </div>
        </li>
    );
};

export default CategoryBookListItem;

// function CategoryBookListItem(props: BookItem) {
//
//     const  {dispatch} = useContext(CartStore);
//     const addBookToCart = () => {
//         dispatch({ type: CartTypes.ADD, item: props, id: props.bookId });
//     };
//
//     return (
//
//         <li className="book-box">
//             <div className="book-image">
//                 <img src={require('../assets/images/books/' + bookImageFileName(props))}
//                      alt="book.title"
//                 />
//                 {props.isPublic && <button className="read-now-button">Read</button>}
//             </div>
//             <div className="book-data">
//                 <div className="book-title">{props.title}</div>
//                 <div className="book-author">{props.author}</div>
//                 <div className="book-price">${(props.price / 100).toFixed(2)}</div>
//                 <button className="button" onClick={addBookToCart}>Add to Cart</button>
//             </div>
//         </li>
//
//     )
// }
//
// export default CategoryBookListItem;
