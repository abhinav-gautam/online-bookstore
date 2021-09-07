import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './authorsSlice';
import booksReducer from './booksSlice';
import cartReducer from './cartSlice';
import categoryReducer from './categorySlice';
import userReducer from './userSlice';

export default configureStore({
    reducer: {
        category: categoryReducer,
        books: booksReducer,
        authors: authorsReducer,
        user: userReducer,
        cart: cartReducer
    }
})