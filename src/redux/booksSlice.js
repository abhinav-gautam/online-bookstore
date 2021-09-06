import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBooks = createAsyncThunk("getBooks", async (_, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:4000/books/`)
    if (data.status === "success") {
        return data.payload
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

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
        // Get featuredBooks
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
    }
})
export const { addToRecentlyViewed } = booksSlice.actions
export default booksSlice.reducer