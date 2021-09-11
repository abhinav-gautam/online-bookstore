import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getBooks = createAsyncThunk("getBooks", async (_, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:4000/books/`)
    if (data.status === "success") {
        return data.payload
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})