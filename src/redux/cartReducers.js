import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const addItemToCart = createAsyncThunk("addItemToCart", (async (bookQty, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/cart/addItem", { book: bookQty.book, quantity: bookQty.quantity }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(bookQty)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const loadCart = createAsyncThunk("loadCart", (async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.get("http://localhost:4000/cart/getItems", {
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

export const removeCartItem = createAsyncThunk("removeCartItem", (async (itemIndex, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/cart/removeItem", { book: itemIndex.item.book }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(itemIndex.index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const updateItemQty = createAsyncThunk("updateItemQty", (async (bookQty, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/cart/updateQty", { book: bookQty.book, quantity: bookQty.quantity }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(bookQty)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))