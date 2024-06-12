"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UpdateProfile, VerifyOtp, deleteUser, forgotPassword, sendVerificationOtp } from "../../components/dataapi/APIConfig";
import { toast } from "react-toastify";


const ProfileState = {
    userInfo: null,
    loading: false,
    isUpdated: false
}

export const handleUpdateProfile = createAsyncThunk("auth/handleUpdateProfile", async (data, { rejectWithValue }) => {
    try {
        const res = await UpdateProfile("updateProfile", data);
        if (res.status === 200) {
            // toast.success("Profile Updated SuccessFully!");
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
        return rejectWithValue(error.response.data.message); // Return error response data
    }
})

export const handleForgotPassword = createAsyncThunk("auth/handleForgotPassword", async (data, { rejectWithValue }) => {
    try {
        const res = await forgotPassword("forgotPassword", data);
        if (res.status === 200) {
            toast.success("Mail Sent Sucesfully, Plz check Inbox");
            return res.data;
        }
    } catch (error) {
        console.log("error", error)
        // toast.error(error.response.data.message);
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.message;
            toast.warning(errorMessage);
            console.log("Error Message: ", errorMessage);
        } else {
            console.log("Unexpected Error: ", error.message);
        }
        return rejectWithValue(error.response.data.message); // Return error response data
    }
})

export const handleDeleteUser = createAsyncThunk("auth/handleDeleteUser", async (data, { rejectWithValue }) => {
    try {
        const res = await deleteUser(`userdelete/${data.id}`);

        console.log("res => ", res)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response.data.message);
    }

})

export const handleChangePassword = createAsyncThunk("auth/handleChangePassword", async (data, { rejectWithValue }) => {
    try {
        const res = await deleteUser(`changepassword`);

        console.log("res => ", res)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("error", error)
        return rejectWithValue(error.response.data.message);
    }

})

export const profileSlice = createSlice({
    name: "auth",
    initialState:ProfileState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(handleUpdateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
            state.isUpdated = false
        })
        .addCase(handleUpdateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = true
            state.user = action.payload.user;
            state.userToken = action.payload.user.token
        })
        .addCase(handleUpdateProfile.rejected, (state, action) => {
            state.loading = false;
            state.isUpdated = false;
            state.isAuthenticated = false;
            state.error = action.error.message;
        })
        .addCase(handleForgotPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(handleForgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload
        })
        .addCase(handleForgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        
        .addCase(handleDeleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(handleDeleteUser.fulfilled, (state, action) => {
            state.userInfo = null;
            state.loading = false;
            state.isUpdated = null;
        })
        .addCase(handleDeleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.isUpdated = false;
        })
    }
})

export const sendVerifyOtp = async (data) => { 
    try {
        const res = await sendVerificationOtp(`sendVerifyEmail`, data);
        console.log("res => ", res)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("error", error);
        return error;
    }
}

export const handleVerifyOtp = async (data) => { 
    try {
        const res = await VerifyOtp(`verifyEmail`, data);
        console.log("res => ", res)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("error", error);
        return error;
    }
}

// export const { handleRegister, handleLogin, hanldeLogOut } = userSlice.actions
export default profileSlice.reducer;