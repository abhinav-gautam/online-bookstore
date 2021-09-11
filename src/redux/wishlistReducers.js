import axios from "axios";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const addItemToWishlist = createAsyncThunk("addItemToWishlist", (async (book, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/wishlist/addItem", { book }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(book)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const loadWishlist = createAsyncThunk("loadWishlist", (async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.get("http://localhost:4000/wishlist/getItems", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return data
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const removeWishlistItem = createAsyncThunk("removeWishlistItem", (async ({ book, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/wishlist/removeItem", { book }, {
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