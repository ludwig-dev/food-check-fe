import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Recipe } from "./recipeSlice";

const API_URL_RECIPES = "http://localhost:8080/api/recipes";

interface PublishedRecipeState {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: PublishedRecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

export const fetchPublishedRecipes = createAsyncThunk("recipe/fetchPublishedRecipes", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL_RECIPES}/public`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch public recipes");
    }
});

const publishedRecipeSlice = createSlice({
    name: "publishedRecipe",
    initialState,
    reducers: {
        clearPublishedRecipes: (state) => {
            state.recipes = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all published recipes
            .addCase(fetchPublishedRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPublishedRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.recipes = action.payload;
                state.loading = false;
            })
            .addCase(fetchPublishedRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearPublishedRecipes } = publishedRecipeSlice.actions;
export default publishedRecipeSlice.reducer;