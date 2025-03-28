import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_FOOD = "http://localhost:8080/api/food";

export interface Food {
  id: number;
  name: string;
}

interface FoodState {
  searchResults: Food[];
  loading: boolean;
  error: string | null;
}

const initialState: FoodState = {
  searchResults: [],
  loading: false,
  error: null,
};

export const searchFood = createAsyncThunk("food/searchFood", async (query: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL_FOOD}/search?query=${query}`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to search food");
  }
});

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFood.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(searchFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default foodSlice.reducer;
