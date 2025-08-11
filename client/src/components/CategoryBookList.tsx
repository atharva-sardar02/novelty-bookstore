import '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import "../types";
import {BookItem} from "../types";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function CategoryBookList() {


    const {id} = useParams ();
    const [bookList, setBookList] = useState<BookItem[]>([]);
    useEffect(() => {
        axios.get(`http://webdev.cs.vt.edu:8080/AtharvaBookstoreReactTransact/api/categories/name/${id}/books/`)
        // axios.get(`http://localhost:8080/AtharvaBookstoreReactTransact/api/categories/name/${id}/books/`)
            .then((result) => setBookList(result.data ))
            .catch(console.error);
    }, [id]);

    console.log(bookList)
    return (
        <div className="category-book-list-container">
            <><CategoryNav/>
                <ul className="book-lists">

                    {bookList.map((book: BookItem) => (
                        <CategoryBookListItem key={book.bookId} bookId={book.bookId} isPublic={book.isPublic} price={book.price}
                                              title={book.title} author={book.author} categoryId={book.categoryId}/>))}

                </ul>
            </>
        </div>
    )
}

export default CategoryBookList;
