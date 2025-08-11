import {CategoryItem} from "../types";
import {createContext, ReactNode, useEffect, useState} from "react";
import axios from "axios";

export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';


// @ts-ignore
function CategoryContext ({ children })  {
    // cut/paste the categories code here from the App component
    const [categories, setCategories]  = useState([]);
    useEffect(() => {
        axios.get('http://webdev.cs.vt.edu:8080/AtharvaBookstoreReactTransact/api/categories')
        // axios.get('http://localhost:8080/AtharvaBookstoreReactTransact/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;