import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"

// Get All Categories
export const getCategories = createAsyncThunk("getCategories", (async (_, thunkAPI) => {
    const { data } = await axios.get("http://localhost:4000/category/")
    if (data.status === "success") {
        return data
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))



// Initial State
const initialCategoryState = {
    categories: [],
    isCategoryLoading: false,
    categoryError: "",
    categoryCount: 0
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
            state.categories = action.payload.data.categories
            state.categoryCount = action.payload.data.categories.length
        },
        [getCategories.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.message
        },

    }

})

export default categorySlice.reducer