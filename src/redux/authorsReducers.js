import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Get all authors
export const getAuthors = createAsyncThunk("getAuthors", async (_, thunkAPI) => {
    const { data } = await axios.get("http://localhost:4000/authors/")
    if (data.status === "success") {
        return data.payload
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})