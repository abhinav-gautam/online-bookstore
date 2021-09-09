import CryptoJS from 'crypto-js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

// User Login
export const userLogin = createAsyncThunk("loginUser", async (userCreds, thunkAPI) => {
    const { data } = await axios.post("http://localhost:4000/users/login", userCreds)
    if (data.status === "success") {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", data.user)
        const decryptedUser = JSON.parse(CryptoJS.AES.decrypt(data.user, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
        return decryptedUser
    } else if (data.status === "failed") {
        return thunkAPI.rejectWithValue(data)
    }
})

// Update User
export const updateUser = createAsyncThunk("updateuser", async (formData, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.put("http://localhost:4000/users/update", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        const decryptedUser = JSON.parse(CryptoJS.AES.decrypt(data.user, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
        return decryptedUser
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

export const resetUser = createAsyncThunk("resetUser", () => {
    return new Promise((resolve, reject) => {
        localStorage.removeItem("token")
        resolve("done")
    })
})

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
        // Reset user
        [resetUser.fulfilled]: (state) => {
            state = initialUserState
            return state
        },
        // User login
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
    }
})
export const { setUser } = userSlice.actions
export default userSlice.reducer