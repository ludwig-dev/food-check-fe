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

export const addIngredient = createAsyncThunk(
    "recipe/addIngredient",
    async (data: { recipeId: number; foodId: number; amountInGrams: number }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL_RECIPES}/${data.recipeId}/ingredients/add`,
                { foodId: data.foodId, amountInGrams: data.amountInGrams },
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add ingredient");
        }
    }
);

export const removeIngredient = createAsyncThunk(
    "recipe/removeIngredient",
    async (data: { recipeId: number; foodId: number }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API_URL_RECIPES}/${data.recipeId}/ingredients/${data.foodId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to remove ingredient");
        }
    }
);

export const deleteRecipe = createAsyncThunk(
    "recipe/deleteRecipe",
    async (recipeId: number, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL_RECIPES}/${recipeId}`, { withCredentials: true });
            return recipeId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete recipe");
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
            })
            // Handle add ingredient
            .addCase(addIngredient.fulfilled, (state, action: PayloadAction<Recipe>) => {
                const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
                if (index !== -1) {
                    state.recipes[index] = action.payload;
                }
            })
            .addCase(addIngredient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }
            )
            // Handle remove ingredient
            .addCase(removeIngredient.fulfilled, (state, action: PayloadAction<Recipe>) => {
                const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
                if (index !== -1) {
                    state.recipes[index] = action.payload;
                }
            })
            .addCase(removeIngredient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Handle delete recipe
            .addCase(deleteRecipe.fulfilled, (state, action: PayloadAction<number>) => {
                state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
            })
            .addCase(deleteRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Handle create recipe error
            .addCase(createRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default recipeSlice.reducer;
