import { createSlice } from '@reduxjs/toolkit';

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
        }
    },
    extraReducers: {}
})
export const { resetWishlist, setWishlistUsername } = wishlistSlice.actions
export default wishlistSlice.reducer