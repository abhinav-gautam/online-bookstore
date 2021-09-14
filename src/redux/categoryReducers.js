import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Get All Categories
export const getCategories = createAsyncThunk("getCategories", (async (_, thunkAPI) => {
    const { data } = await axios.get("http://localhost:4000/category/")
    if (data.status === "success") {
        return data.payload
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

// Add Category
export const addCategory = createAsyncThunk("addCategory", (async (category, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/category/addCategory", category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(category)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

// Delete Category
export const deleteCategory = createAsyncThunk("deleteCategory", (async ({ category, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/category/deleteCategory", category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

// Update Category
export const updateCategory = createAsyncThunk("updateCategory", (async ({ category, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/category/updateCategory", category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue({ category, index })
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))