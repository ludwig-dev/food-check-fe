import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL_USERS = "http://localhost:8080/api/users";

// USER ACTIONS
export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL_USERS}/me`, { withCredentials: true });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
);

export const updateUsername = createAsyncThunk<User, string>(
    "user/updateUsername",
    async (newUsername, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch<User>(
                `${API_URL_USERS}/me`,
                { username: newUsername },
                { withCredentials: true }
            );
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to update username");
        }
    }
);

export const updateEmail = createAsyncThunk<User, string>(
    "user/updateEmail",
    async (newEmail, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch<User>(
                `${API_URL_USERS}/me`,
                { email: newEmail },
                { withCredentials: true }
            );
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to update email");
        }
    }
);

export const deleteAccount = createAsyncThunk(
    "user/deleteAccount",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL_USERS}/me`, { withCredentials: true });
            dispatch(clearUser());
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete account");
        }
    }
);

// USER SLICE

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // ********************** fetchUserProfile **********************
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.loading = false
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            // ********************** updateUsername **********************
            .addCase(updateUsername.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUsername.fulfilled, (state, action) => {
                if (state.user) state.user.username = action.payload.username;
                state.loading = false;
            })
            .addCase(updateUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // ********************** updateEmail **********************
            .addCase(updateEmail.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEmail.fulfilled, (state, action) => {
                if (state.user) state.user.email = action.payload.email;
                state.loading = false;
            })
            .addCase(updateEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
