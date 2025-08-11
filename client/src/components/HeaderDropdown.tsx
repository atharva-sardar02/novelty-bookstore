import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import {Link} from 'react-router-dom';
import {CategoryItem} from "../types";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";


function HeaderDropdown() {
    const categories = useContext<CategoryItem[]>(Category);
    return (

        <div className="header-dropdown">
            <button className="button categories-button">Categories</button>

            <ul>
                <ul>
                    {categories.map((item) =>
                        <li key={item.categoryId}>
                            <Link to={`/categories/${item.name}`}>

                                {item.name}
                            </Link>
                        </li>)}
                </ul>
            </ul>


        </div>

    )
}

export default HeaderDropdown

