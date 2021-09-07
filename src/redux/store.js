import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './authorsSlice';
import booksReducer from './booksSlice';
import categoryReducer from './categorySlice';
import userReducer from './userSlice';

export default configureStore({
    reducer: {
        category: categoryReducer,
        books: booksReducer,
        authors: authorsReducer,
        user: userReducer
    }
})