import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {useContext, useEffect, useState} from "react";
import {CategoryItem} from "../types";
import {Link, useParams} from "react-router-dom";
import {Category} from "../contexts/CategoryContext";


function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
    const { categoryName } = useParams();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(categories[0]?.categoryId || null);
    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };
    useEffect(() => {
        const foundCategory = categories.find(category => category.name === categoryName);
        if (foundCategory) {
            setSelectedCategory(foundCategory.categoryId);
        }
    }, [categoryName, categories]);


    return (
        <nav className="category-nav">
            <ul className="category-buttons">

                {categories.map((category) => (

                    // <li
                    //     className="button unselected-category-button">
                    //     {category.name}
                    // </li>


                    <li
                        key={category.categoryId}
                        className={`button ${selectedCategory === category.categoryId ? 'selected-category-button' : 'unselected-category-button'}`}
                        onClick={() => handleCategoryClick(category.categoryId)}

                    >
                        <Link to={`/categories/${category.name}`} style={{ color: 'rgb(139, 69, 0)', fontWeight: selectedCategory === category.categoryId ? 'bold' : 'normal' }}>
                        {category.name}
                        </Link>
                    </li>


                ))}

            </ul>
        </nav>
    )
}

export default CategoryNav;

