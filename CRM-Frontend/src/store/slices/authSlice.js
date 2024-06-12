"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteUser, forgotPassword, loadUser, loginUser, registerUser, resetpassword } from "../../components/dataapi/APIConfig";
import { toast } from "react-toastify";


const initialState = {
    userInfo: null,
    loading: false,
    userToken: null,
    error: null,
    isAuthenticated: false,
}

export const handleLoadUser = createAsyncThunk("auth/handleLoadUser", async (data, { rejectWithValue }) => {
    try {
        const res = await loadUser("me", data);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("error", error)
        // toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})
export const handleLogin = createAsyncThunk("auth/handleLogin", async (data, { rejectWithValue }) => {
    try {
        console.log("data => ", data)
        const res = await loginUser("login", data);
        if (res.status === 200) {
            // toast.success("Login Successfull");
            return res.data;
        }
    } catch (error) {
        console.log("error", error)
        // toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})

export const handleRegister = createAsyncThunk("auth/handleRegister", async (data, { rejectWithValue }) => {
    try {
        const res = await registerUser("register", data);
        if (res.status === 201) {
            // toast.success("Registeraltion Successfull, Do login");
            return res.data;
        }
    } catch (error) {
        console.log("error", error)
        // toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
})


export const handleForgotPassword = createAsyncThunk("auth/handleForgotPassword", async (data, { rejectWithValue }) => {
    try {
        const res = await forgotPassword("forgotPassword", data);
        if (res.status === 200) {
            // toast.success("Mail Sent Sucesfully, Plz check Inbox");
            return res.data;
        }
    } catch (error) {
        console.log("error", error)
        // toast.error(error.response.data.message);
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.message;
            // toast.warning(errorMessage);
            console.log("Error Message: ", errorMessage);
        } else {
            console.log("Unexpected Error: ", error.message);
        }
        return rejectWithValue(error.response.data.message);
    }
})
export const handleResetPassword = createAsyncThunk("auth/handleForgotPassword", async (data, { rejectWithValue }) => {
    try {
        const res = await resetpassword(`resetpassword`, data);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("error", error)
        // toast.error(error.response.data.message);
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.message;
            console.log("Error Message: ", errorMessage);
        } else {
            console.log("Unexpected Error: ", error.message);
        }
        return rejectWithValue(error.response.data.message);
    }
})

export const handleLogOut = createAsyncThunk("auth/handleLogout", async (state, action) => {
    toast.success("Logout Successfull!");
    return true
});


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        handleLogOut
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = action.payload.user;
                state.isAuthenticated = true;
                state.userToken = action.payload.token
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })
            .addCase(handleLoadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleLoadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = action.payload.user;
                state.isAuthenticated = true;
                state.userToken = action.payload.token
            })
            .addCase(handleLoadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })
            .addCase(handleRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = action.payload;
            })
            .addCase(handleRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })
            .addCase(handleLogOut.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleLogOut.fulfilled, (state, action) => {
                state.userInfo = null;
                state.loading = false;
                state.auth = null;
                state.isAuthenticated = false;
                state.userToken = ""
                state.error = null
            })
            .addCase(handleLogOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })
           
    }
})

// export const { hanldeLogOut } = userSlice.actions
export default authSlice.reducer;