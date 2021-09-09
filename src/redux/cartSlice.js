import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
/*
itemIndex:{
    item:{
        book:{},
        quantity:3
    },
    index:2
}

*/
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

const initialCartState = {
    cartItems: [], username: "",
    isCartLoading: false, cartError: "",
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
        },
        [removeCartItem.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.message
        },
        // Update item quantity
        [updateItemQty.pending]: (state, action) => {
            state.isCartLoading = true
            state.cartError = ""
        },
        /*
        cartItems= [
            {
            book:{},
            quantity:2
        },{}
        ]
        action.payload = {
            book:{},
            quantity:2
        }
        */
        [updateItemQty.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cartItems
                .find(bookQty =>
                    JSON.stringify(bookQty.book) === JSON.stringify(action.payload.book)
                )["quantity"] = action.payload.quantity
        },
        [updateItemQty.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.message
        },
    }
})
export const { resetCart } = cartSlice.actions
export default cartSlice.reducer