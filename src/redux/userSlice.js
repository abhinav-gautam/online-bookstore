import { createSlice } from '@reduxjs/toolkit';
import { addAddress, addCard, deleteAddress, deleteCard, getUsers, updateAddress, updateCard, updateRole, updateUser, userLogin } from './userReducers';

export const initialUserState = {
    user: {}, isAuth: false,
    isUserLoading: false,
    userErrors: "", allUsers: []
}

const promisePending = state => {
    return state = { ...state, isUserLoading: true, userErrors: "" }
}

const promiseRejected = (state, action) => {
    return state = { ...state, isUserLoading: false, userErrors: action.payload.message }
}

const updateState = (state, newState) => {
    return state = { ...state, ...newState }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => updateState(state, { user: action.payload, isAuth: true }),
        resetUser: state => updateState(state, initialUserState)
    },
    extraReducers: {
        // User login
        [userLogin.pending]: promisePending,
        [userLogin.fulfilled]: (state, action) => updateState(state, { isUserLoading: false, user: action.payload, isAuth: true }),
        [userLogin.rejected]: promiseRejected,
        // Update User
        [updateUser.pending]: promisePending,
        [updateUser.fulfilled]: (state, action) => updateState(state, { user: { ...state.user, ...action.payload }, isUserLoading: false }),
        [updateUser.rejected]: promiseRejected,
        // Add Address
        [addAddress.pending]: promisePending,
        [addAddress.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.addresses.push(action.payload)
        },
        [addAddress.rejected]: promiseRejected,
        // Delete Address
        [deleteAddress.pending]: promisePending,
        [deleteAddress.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.addresses.splice(action.payload, 1)
        },
        [deleteAddress.rejected]: promiseRejected,
        // Update Address
        [updateAddress.pending]: promisePending,
        [updateAddress.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.addresses.splice(action.payload.index, 1, action.payload.address)
        },
        [updateAddress.rejected]: promiseRejected,
        // Add Card
        [addCard.pending]: promisePending,
        [addCard.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.cards.push(action.payload)
        },
        [addCard.rejected]: promiseRejected,
        // Delete Card
        [deleteCard.pending]: promisePending,
        [deleteCard.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.cards.splice(action.payload, 1)
        },
        [deleteCard.rejected]: promiseRejected,
        // Update Card
        [updateCard.pending]: promisePending,
        [updateCard.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.user.cards.splice(action.payload.index, 1, action.payload.card)
        },
        [updateCard.rejected]: promiseRejected,
        // Get users
        [getUsers.pending]: state => {
            state.userErrors = ""
        },
        [getUsers.fulfilled]: (state, action) => {
            state.isUserLoading = false
            state.allUsers = action.payload
        },
        [getUsers.rejected]: promiseRejected,
        // Update user role
        [updateRole.pending]: promisePending,
        [updateRole.fulfilled]: (state, action) => {
            state.isUserLoading = false
            action.payload.user.status
                ? state.allUsers[action.payload.index].status = action.payload.user.status
                : state.allUsers[action.payload.index].role = action.payload.user.role
        },
        [updateRole.rejected]: promiseRejected,
    }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer