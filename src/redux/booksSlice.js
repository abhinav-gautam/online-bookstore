import { createSlice } from '@reduxjs/toolkit';
import { addBook, deleteBook, getBooks, updateBook } from './booksReducers';

const initialBooksState = {
    books: [], isBooksLoading: false, booksError: "", recentlyViewed: []
}

const booksSlice = createSlice({
    name: "books",
    initialState: initialBooksState,
    reducers: {
        addToRecentlyViewed: (state, action) => {
            state.recentlyViewed.splice(0, 0, action.payload)
        }
    },
    extraReducers: {
        // Get all books
        [getBooks.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books = action.payload.books
        },
        [getBooks.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.message
        },
        // Add book
        [addBook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [addBook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books.push(action.payload.book)
        },
        [addBook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.message
        },
        // Delete book
        [deleteBook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books.splice(action.payload, 1)
        },
        [deleteBook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.message
        },
        // Update book
        [updateBook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [updateBook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books.splice(action.payload.index, 1, action.payload.book)
        },
        [updateBook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.message
        },

    }
})

export const { addToRecentlyViewed } = booksSlice.actions
export default booksSlice.reducer