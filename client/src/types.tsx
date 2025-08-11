// Contains all the custom types we want to use for our application
// import Classics from './assets/images/categories/classics.jpg';
// import Fantasy from './assets/images/categories/fantasy.jpg';
// import Mystery from './assets/images/categories/mystery.jpg';
// import Romance from './assets/images/categories/romance.jpg';

import CategoryBookListItem from "./components/CategoryBookListItem";

export interface BookItem {
    bookId: number;
    title: string;
    author: string;
    price: number;
    isPublic: boolean;
    categoryId: number;
}

export interface CategoryItem {
    categoryId: number;
    name: string;
}

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
    id:number;
    titles: string | undefined;
    price: number;
    book: BookItem;
    quantity: number;

    constructor(theBook: BookItem) {
        this.id = theBook.bookId;
        this.titles = theBook.title;
        this.price = theBook.price;
        this.book = theBook;
        this.quantity = 1;
    }
}
// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] =  [];


// From https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const PriceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

export const asDollarsAndCents = function (cents: number) {
    return PriceFormatter.format(cents / 100.0);
};

export interface ContextProps {
    children: JSX.Element | JSX.Element[]
}

export const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039];
export interface CustomerForm {
    name: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpiryMonth: number;
    ccExpiryYear: number;
}



export interface ServerErrorResponse {
    reason: string;
    message: string;
    fieldName: string;
    error: boolean;
}

export interface Order {
    orderId: number;
    amount: number;
    dateCreated: number;
    confirmationNumber: number;
    customerId: number;
}

export interface LineItem {
    bookId: number;
    orderId: number;
    quantity: number;
}
export interface Customer {
    customerName: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpDate: number;
}

export interface OrderDetails {
    order: Order;
    customer: Customer;
    books: BookItem[];
    lineItems: LineItem[];
}


// export const initialOrderDetailsState: OrderDetails = {
//     order: {
//         orderId: 0,
//         amount: 0,
//         dateCreated: 0,
//         confirmationNumber: 0,
//         customerId: 0,
//     },
//     customer: {
//         customerName: "",
//         address: "",
//         phone: "",
//         email: "",
//         ccNumber: "",
//         ccExpDate: 0,
//     },
//     books: [],
//     lineItems: [],
// };






// export const categoryImages: Record<string, any> = {
//     classics: Classics,
//     fantasy: Fantasy,
//     mystery: Mystery,
//     romance: Romance
// };
// export const categoryList = [
//     {categoryId: 1001, name: "Sci-fi"},
//     {categoryId: 1002, name: "Romance"},
//     {categoryId: 1003, name: "Mystery"},
//     {categoryId: 1004, name: "Children"},
//     {categoryId: 1005, name: "Non-fiction"},
// ];
// export interface CatProp{
//     catList:CategoryItem[];
// }
//
// export interface BookProp{
//     bookList:BookItem[];
// }


// export const bookList = [
//     {
//         bookId: 1001,
//         title: "Gone Girl",
//         author: "Gillian Flynn",
//         price: 499,
//         isPublic: true,
//         categoryId: 1003,
//     },
//     {
//         bookId: 1002,
//         title: "Death on the Nile",
//         author: "Agatha Christie",
//         price: 1399,
//         isPublic: false,
//         categoryId: 1003,
//     },
//     {
//         bookId: 1003,
//         title: "The Silent Patient",
//         author: "Alex Michaelides",
//         price: 899,
//         isPublic: false,
//         categoryId: 1003,
//     },
//     {
//         bookId: 1004,
//         title: "And Then There Were None",
//         author: "Agatha Christie",
//         price: 499,
//         isPublic: true,
//         categoryId: 1003,
//     },
// ];