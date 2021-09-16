import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Get all the books
export const getBooks = createAsyncThunk("getBooks", async (_, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:4000/books/`)
    if (data.status === "success") {
        return data.payload
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Add a book
export const addBook = createAsyncThunk("addBook", async (formData, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post(`http://localhost:4000/books/addBook`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status) {
        return data
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Add a book
export const deleteBook = createAsyncThunk("deleteBook", async ({ bookId, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post(`http://localhost:4000/books/deleteBook`, { _id: bookId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status) {
        return index
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Update a book
export const updateBook = createAsyncThunk("updateBook", async ({ formData, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post(`http://localhost:4000/books/updateBook`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status) {
        return { book: data.book, index }
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})