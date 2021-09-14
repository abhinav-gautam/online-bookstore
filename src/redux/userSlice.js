import { createSlice } from '@reduxjs/toolkit';
import { addAddress, addCard, deleteAddress, deleteCard, updateAddress, updateCard, updateUser, userLogin } from './userReducers';

const initialUserState = {
    user: {}, isAuth: false,
    isUserLoading: false,
    userErrors: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuth = true
            return state
        },
        resetUser: state => {
            state = initialUserState
            return state
        }
    },
    extraReducers: {
        // User login
        [userLogin.pending]: (state, action) => {
            state.isUserLoading = true
            state.userErrors = ""
        },
        [userLogin.fulfilled]: (state, action) => {
            state.user = action.payload
            state.isAuth = true
            state.isUserLoading = false
            state.userErrors = ""
        },
        [userLogin.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
        // Update User
        [updateUser.pending]: (state, action) => {
            state.userErrors = ""
            state.isUserLoading = true
        },
        [updateUser.fulfilled]: (state, action) => {
            state.user = { ...state.user, ...action.payload }
            state.isUserLoading = false
            state.userErrors = ""
        },
        [updateUser.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
        // Add Address
        [addAddress.pending]: (state, action) => {
            state.userErrors = ""
            state.isUserLoading = true
        },
        [addAddress.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.addresses.push(action.payload)
        },
        [addAddress.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
        // Delete Address
        [deleteAddress.pending]: (state, action) => {
            state.userErrors = ""
            state.isUserLoading = true
        },
        [deleteAddress.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.addresses.splice(action.payload, 1)
        },
        [deleteAddress.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
        // Update Address
        [updateAddress.pending]: (state, action) => {
            state.userErrors = ""
            state.isUserLoading = true
        },
        [updateAddress.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isUserLoading = false
            state.user.addresses.splice(action.payload.index, 1, action.payload.address)
        },
        [updateAddress.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
        // Add Card
        [addCard.pending]: (state, action) => {
            state.userErrors = ""
            state.isUserLoading = true
        },
        [addCard.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.cards.push(action.payload)
        },
        [addCard.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
        // Delete Card
        [deleteCard.pending]: (state, action) => {
            state.userErrors = ""
            state.isUserLoading = true
        },
        [deleteCard.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.cards.splice(action.payload, 1)
        },
        [deleteCard.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
        // Update Card
        [updateCard.pending]: (state, action) => {
            state.userErrors = ""
            state.isUserLoading = true
        },
        [updateCard.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isUserLoading = false
            state.user.cards.splice(action.payload.index, 1, action.payload.card)
        },
        [updateCard.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
    }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer