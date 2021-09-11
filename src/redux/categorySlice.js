import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './categoryReducers';

// Initial State
const initialCategoryState = {
    categories: [],
    isCategoryLoading: false,
    categoryError: "",
}

// Slice
const categorySlice = createSlice({
    name: "category",
    initialState: initialCategoryState,
    reducers: {
    },
    extraReducers: {
        // Get categories
        [getCategories.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories = action.payload.categories
        },
        [getCategories.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.message
        },

    }

})
export default categorySlice.reducer