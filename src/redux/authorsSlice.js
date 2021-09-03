import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Get authors
export const getFeaturedAuthors = createAsyncThunk("getFeaturedAuthors", async (_, thunkAPI) => {
    const { data } = await axios.get("http://localhost:4000/authors/?limit=5")
    if (data.status === "success") {
        return data.payload
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

const initialAuthorsState = {
    authors: [], isAuthorsLoading: false, authorsError: "",
    featuredAuthors: [], isFeaturedAuthorsLoading: false, featuredAuthorsError: "",
}

const authorsSlice = createSlice({
    name: "authors",
    initialState: initialAuthorsState,
    reducers: {},
    extraReducers: {
        // Get authors
        [getFeaturedAuthors.pending]: state => {
            state.isFeaturedAuthorsLoading = true
            state.featuredAuthorsError = ""
        },
        [getFeaturedAuthors.fulfilled]: (state, action) => {
            console.log(action.payload);

            state.isFeaturedAuthorsLoading = false
            state.featuredAuthors = action.payload.authors
        },
        [getFeaturedAuthors.rejected]: (state, action) => {
            state.isFeaturedAuthorsLoading = false
            state.featuredAuthorsError = action.payload.message
        },
    }
})

export default authorsSlice.reducer