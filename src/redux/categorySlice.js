import { createSlice } from '@reduxjs/toolkit';
import { addCategory, deleteCategory, getCategories, updateCategory } from './categoryReducers';

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
        // Add category
        [addCategory.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [addCategory.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories.push(action.payload)
        },
        [addCategory.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.message
        },
        // Delete category
        [deleteCategory.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories.splice(action.payload, 1)
        },
        [deleteCategory.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.message
        },
        // Update category
        [updateCategory.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories.splice(action.payload.index, 1, action.payload.category)
        },
        [updateCategory.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.message
        },

    }

})
export default categorySlice.reducer