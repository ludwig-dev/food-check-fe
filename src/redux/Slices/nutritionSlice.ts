import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Nutrition {
  namn: string;
  totaltVarde: number;
  enhet: string;
  procentAvRDI: number | null;
}

interface NutritionState {
  nutrition: Nutrition[];
  loading: boolean;
  error: string | null;
}

const initialState: NutritionState = {
  nutrition: [],
  loading: false,
  error: null,
};

export const fetchNutritionForRecipe = createAsyncThunk(
  "nutrition/fetchNutritionForRecipe",
  async (recipeId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/recipes/${recipeId}/nutrition`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch nutrition");
    }
  }
);

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    clearNutrition: (state) => {
      state.nutrition = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNutritionForRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionForRecipe.fulfilled, (state, action: PayloadAction<Nutrition[]>) => {
        state.nutrition = action.payload;
        state.loading = false;
      })
      .addCase(fetchNutritionForRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearNutrition } = nutritionSlice.actions;
export default nutritionSlice.reducer;
