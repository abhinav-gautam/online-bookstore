import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addItemToCart = createAsyncThunk("addItemToCart", (async (book, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/cart/addItem", { book }, {
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

export const loadCart = createAsyncThunk("loadCart", (async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.get("http://localhost:4000/cart/getItems", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(data);
    if (data.status === "success") {
        return data
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const removeCartItem = createAsyncThunk("removeCartItem", (async (book, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/cart/removeItem", { book: book.item }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(book.index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

const initialCartState = {
    cartItems: [], username: "",
    isCartLoading: false, cartError: "",
    cartCount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        resetCart: state => {
            state = initialCartState
            return state
        }
    },
    extraReducers: {
        // Add items to cart
        [addItemToCart.pending]: (state, action) => {
            state.cartError = ""
            state.isCartLoading = true
        },
        [addItemToCart.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cartItems.push(action.payload)
            state.cartCount++
        },
        [addItemToCart.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.message
        },

        // Load cart
        [loadCart.pending]: (state, action) => {
            state.isCartLoading = true
            state.cartError = ""
        },
        [loadCart.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cartItems = action.payload.items
            state.cartCount = action.payload.items.length
        },
        [loadCart.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.message
        },

        // Remove Cart Item
        [removeCartItem.pending]: (state, action) => {
            state.isCartLoading = true
            state.cartError = ""
        },
        [removeCartItem.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cartItems.splice(action.payload, 1)
            state.cartCount--
        },
        [removeCartItem.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.message
        },
    }
})
export const { resetCart } = cartSlice.actions
export default cartSlice.reducer