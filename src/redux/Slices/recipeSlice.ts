import { createAsyncThunk, createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_RECIPES = "http://localhost:8080/api/recipes";


export interface RecipeDetailsData {
    id: number;
    name: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    foodId: number;
    foodName: string;
    amountInGrams: number;
}

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

export const fetchRecipeById = createAsyncThunk(
    "recipe/fetchRecipeById",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL_RECIPES}/${id}`, { withCredentials: true });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch recipe details");
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
    reducers: {
        clearRecipes: (state) => {
            state.recipes = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all recipes
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
            // Create a new recipe
            .addCase(createRecipe.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRecipe.fulfilled, (state, action: PayloadAction<RecipeDetailsData>) => {
                state.recipes.push(action.payload);
                state.loading = false;
            })
            .addCase(createRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch recipe by ID
            .addCase(fetchRecipeById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecipeById.fulfilled, (state, action: PayloadAction<RecipeDetailsData>) => {
                state.loading = false;
                const index = state.recipes.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.recipes[index] = action.payload;
                } else {
                    state.recipes.push(action.payload);
                }
            })
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add ingredient to recipe
            .addCase(addIngredient.pending, (state) => {
                state.loading = true;
            })
            .addCase(addIngredient.fulfilled, (state, action: PayloadAction<RecipeDetailsData>) => {
                state.loading = false;
                const index = state.recipes.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.recipes[index] = action.payload;
                }
                else {
                    state.recipes.push(action.payload);
                }
            })
            .addCase(addIngredient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Remove ingredient from recipe
            .addCase(removeIngredient.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeIngredient.fulfilled, (state, action: PayloadAction<RecipeDetailsData>) => {
                state.loading = false;
                state.error = null;
                const index = state.recipes.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.recipes[index] = action.payload;
                }
                else {
                    state.recipes.push(action.payload);
                }
            })
            .addCase(removeIngredient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete recipe
            .addCase(deleteRecipe.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteRecipe.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.error = null;
                state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
            })
            .addCase(deleteRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
