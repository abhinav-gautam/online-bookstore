import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, loadCart, removeCartItem, updateItemQty } from './cartReducers';

const initialCartState = {
    cartItems: [], cartUsername: "",
    isCartLoading: false, cartError: "",
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        resetCart: state => {
            state = initialCartState
            return state
        },
        setCartUsername: (state, action) => {
            state.cartUsername = action.payload
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
            console.log(action.payload);
            state.isCartLoading = false
            state.cartItems = action.payload.items
            state.cartUsername = action.payload.cartUsername
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

export const { resetCart, setCartUsername } = cartSlice.actions
export default cartSlice.reducer