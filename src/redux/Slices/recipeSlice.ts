import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_RECIPES = "http://localhost:8080/api/recipes";

export interface Recipe {
    id: number;
    name: string;
}

interface RecipeState {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

export const fetchRecipes = createAsyncThunk("recipe/fetchRecipes", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL_RECIPES, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch recipes");
    }
});

export const createRecipe = createAsyncThunk(
    "recipe/createRecipe",
    async (data: { name: string; ingredients: { foodId: number; amountInGrams: number }[] }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_RECIPES, data, { withCredentials: true });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to create recipe");
        }
    }
);

const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.recipes = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
                state.recipes.push(action.payload);
            });
    },
});

export default recipeSlice.reducer;
