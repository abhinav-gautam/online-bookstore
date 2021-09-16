import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { decrypt } from '../components/Helpers/encryption';

// User Login
export const userLogin = createAsyncThunk("loginUser", async (userCreds, thunkAPI) => {
    const { data } = await axios.post("http://localhost:4000/users/login", userCreds)
    if (data.status === "success") {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", data.user)
        const decryptedUser = decrypt(data.user)
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
        const decryptedUser = decrypt(data.user)
        return decryptedUser
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Add address
export const addAddress = createAsyncThunk("addAddress", async (user, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/users/addAddress", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(user.address)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Delete address
export const deleteAddress = createAsyncThunk("deleteAddress", async ({ user, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/users/deleteAddress", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Update address
export const updateAddress = createAsyncThunk("updateAddress", async (user, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/users/updateAddress", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(user)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Add Card
export const addCard = createAsyncThunk("addCard", async (user, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/users/addCard", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(user.card)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Delete Card
export const deleteCard = createAsyncThunk("deleteCard", async ({ user, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/users/deleteCard", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Update Card
export const updateCard = createAsyncThunk("updateCard", async (user, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("http://localhost:4000/users/updateCard", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(user)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Get all users
export const getUsers = createAsyncThunk("getUsers", async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.get("http://localhost:4000/users/getUsers", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return data.users
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Update user role
export const updateRole = createAsyncThunk("updateRole", async ({ user, index }, thunkAPI) => {
    console.log(user, index);
    const token = localStorage.getItem("token")
    const { data } = await axios.put("http://localhost:4000/users/updateRole", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return { user, index }
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})