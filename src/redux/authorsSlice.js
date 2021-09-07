import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Get all authors
export const getAuthors = createAsyncThunk("getAuthors", async (_, thunkAPI) => {
    const { data } = await axios.get("http://localhost:4000/authors/")
    if (data.status === "success") {
        return data.payload
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

const initialAuthorsState = {
    authors: [], isAuthorsLoading: false, authorsError: "",
}

const authorsSlice = createSlice({
    name: "authors",
    initialState: initialAuthorsState,
    reducers: {},
    extraReducers: {
        // Get authors
        [getAuthors.pending]: state => {
            state.isAuthorsLoading = true
            state.authorsError = ""
        },
        [getAuthors.fulfilled]: (state, action) => {
            state.isAuthorsLoading = false
            state.authors = action.payload.authors
        },
        [getAuthors.rejected]: (state, action) => {
            state.isAuthorsLoading = false
            state.authorsError = action.payload.message
        },
    }
})

export default authorsSlice.reducer