import { createSlice } from '@reduxjs/toolkit';
import { getAuthors } from './authorsReducers';

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