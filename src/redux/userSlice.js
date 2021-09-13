import { createSlice } from '@reduxjs/toolkit';
import { updateUser, userLogin } from './userReducers';

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
            console.log("fulfil", action.payload);
            state.user = { ...state.user, ...action.payload }
            state.isUserLoading = false
            state.userErrors = ""
        },
        [updateUser.rejected]: (state, action) => {
            console.log("rejected", action.payload);
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
    }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer