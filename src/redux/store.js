import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './authorsSlice';
import booksReducer from './booksSlice';
import categoryReducer from './categorySlice';

export default configureStore({
    reducer: {
        category: categoryReducer,
        books: booksReducer,
        authors: authorsReducer
    }
})