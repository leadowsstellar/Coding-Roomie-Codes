// Write some Code here

import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegistration } from "./userThunk";
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        username: "",
        password: "",
        confirmPassword: "",
        jwtToken: "",
        isLoading: false,
        isLoggedIn: false,
        isRegistered: false,
        error: null,
        sitekey: "<YOUR_SITEKEY>",
        recaptchaToken: null,
    },
    reducers: {
        usernameChange: (state, action) => { state.username = action.payload.username; },
        passwordChange: (state, action) => { state.password = action.payload.password; },
        confirmPasswordChange: (state, action) => { state.confirmPassword = action.payload.confirmPassword; },
        clearUserData: (state, action) => { state.username = ""; state.password = ""; state.confirmPassword = ""; state.error = null; },
        recaptchaTokenChange: (state, action) => { state.recaptchaToken = action.payload.recaptchaToken; },
    },
    extraReducers: (builder) => {
        builder.addCase(userRegistration.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(userRegistration.fulfilled, (state, action) => {
            state.isLoading = false;
            state.password = "";
            state.confirmPassword = "";
        });
        builder.addCase(userRegistration.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(userLogin.pending, (state, action) => {
            state.error = null;
            state.isLoggedIn = false;
            state.isLoading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.jwtToken = action.payload.jwtToken;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});
export default userSlice;