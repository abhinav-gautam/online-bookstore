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