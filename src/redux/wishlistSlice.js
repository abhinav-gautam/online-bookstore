import { createSlice } from '@reduxjs/toolkit';
import { addItemToWishlist, loadWishlist, removeWishlistItem } from './wishlistReducers';

const initialWishlistState = {
    wishlistItems: [], wishlistUsername: "",
    isWishlistLoading: false, wishlistError: ""
}
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialWishlistState,
    reducers: {
        resetWishlist: state => {
            state = initialWishlistState
            return state
        },
        setWishlistUsername: (state, action) => {
            state.wishlistUsername = action.payload
        },
    },
    extraReducers: {
        // Add items to cart
        [addItemToWishlist.pending]: (state, action) => {
            state.wishlistError = ""
            state.isWishlistLoading = true
        },
        [addItemToWishlist.fulfilled]: (state, action) => {
            state.isWishlistLoading = false
            state.wishlistItems.push(action.payload.book)
        },
        [addItemToWishlist.rejected]: (state, action) => {
            state.isWishlistLoading = false
            state.wishlistError = action.payload.message
        },
        // Load cart
        [loadWishlist.pending]: (state, action) => {
            state.isWishlistLoading = true
            state.wishlistError = ""
        },
        [loadWishlist.fulfilled]: (state, action) => {
            state.isWishlistLoading = false
            state.wishlistItems = action.payload.items
            state.wishlistUsername = action.payload.wishlistUsername
        },
        [loadWishlist.rejected]: (state, action) => {
            state.isWishlistLoading = false
            state.wishlistError = action.payload.message
        },
        // Remove Cart Item
        [removeWishlistItem.pending]: (state, action) => {
            state.isWishlistLoading = true
            state.wishlistError = ""
        },
        [removeWishlistItem.fulfilled]: (state, action) => {
            state.isWishlistLoading = false
            state.wishlistItems.splice(action.payload, 1)
        },
        [removeWishlistItem.rejected]: (state, action) => {
            state.isWishlistLoading = false
            state.wishlistError = action.payload.message
        },
    }
})
export const { resetWishlist, setWishlistUsername } = wishlistSlice.actions
export default wishlistSlice.reducer