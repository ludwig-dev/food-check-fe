import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Recipe, RecipeDetailsData } from "./recipeSlice";

const API_URL_RECIPES = "http://localhost:8080/api/recipes/public";

interface PublishedRecipeState {
    recipes: Recipe[];
    currentRecipe: RecipeDetailsData | null;
    loading: boolean;
    error: string | null;
}

const initialState: PublishedRecipeState = {
    recipes: [],
    currentRecipe: null,
    loading: false,
    error: null,
};

export const fetchPublishedRecipes = createAsyncThunk("recipe/fetchPublishedRecipes", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL_RECIPES}`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch public recipes");
    }
});

export const fetchPublishedRecipeById = createAsyncThunk(
    "recipe/fetchPublishedRecipeById",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL_RECIPES}/${id}`, { withCredentials: true });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch recipe details");
        }
    }
);

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
            })
            // Fetch recipe by ID
            .addCase(fetchPublishedRecipeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPublishedRecipeById.fulfilled, (state, action: PayloadAction<RecipeDetailsData>) => {
                state.loading = false;
                state.currentRecipe = action.payload;
            })
            .addCase(fetchPublishedRecipeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearPublishedRecipes } = publishedRecipeSlice.actions;
export default publishedRecipeSlice.reducer;