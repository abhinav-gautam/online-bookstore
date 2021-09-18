import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './authorsSlice';
import booksReducer from './booksSlice';
import cartReducer from './cartSlice';
import categoryReducer from './categorySlice';
import errorReducer from './errorSlice';
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice';

export default configureStore({
    reducer: {
        category: categoryReducer,
        books: booksReducer,
        authors: authorsReducer,
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        error: errorReducer
    }
})