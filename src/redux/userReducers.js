import CryptoJS from 'crypto-js';
import { createAsyncThunk } from "@reduxjs/toolkit"
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