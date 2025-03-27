import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUserProfile, clearUser } from "./userSlice";

const API_URL_AUTH = "http://localhost:8080/api/auth";

// AUTH

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, username, password }: { email: string; username: string; password: string }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL_AUTH}/register`, { email, username, password }, { withCredentials: true });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(`${API_URL_AUTH}/login`, { email, password }, { withCredentials: true });
            dispatch(fetchUserProfile());
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch }) => {
        try {
            await axios.post(`${API_URL_AUTH}/logout`, {}, { withCredentials: true });
            dispatch(clearAuth());
            dispatch(clearUser());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    });

// AUTH SLICE

interface AuthState {
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isAuthenticated = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearAuth } = authSlice.actions;
export const selectAuth = (state: any) => state.auth;
export const selectIsAdmin = (state: any) => state.auth.user?.roles.includes("ADMIN");
export default authSlice.reducer;
