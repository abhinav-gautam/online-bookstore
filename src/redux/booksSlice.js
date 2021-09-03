import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFeaturedBooks = createAsyncThunk("getFeaturedBooks", async (feature, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:4000/books/featured/${feature}`)
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue({ feature, data: data.payload })
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

const initialBooksState = {
    books: [], isBooksLoading: false, booksError: "",
    featuredBooks: { bestseller: [], newArrival: [], awarded: [] }, isFeaturedBooksLoading: false, featuredBooksError: "",
}

const booksSlice = createSlice({
    name: "books",
    initialState: initialBooksState,
    reducers: {
    },
    extraReducers: {
        // Get featuredBooks
        [getFeaturedBooks.pending]: state => {
            state.isFeaturedBooksLoading = true
            state.featuredBooksError = ""
        },
        [getFeaturedBooks.fulfilled]: (state, action) => {
            state.isFeaturedBooksLoading = false
            state.featuredBooks[action.payload.feature] = action.payload.data[action.payload.feature]
        },
        [getFeaturedBooks.rejected]: (state, action) => {
            state.isFeaturedBooksLoading = false
            state.featuredBooksError = action.payload.message
        },
    }
})

export default booksSlice.reducer