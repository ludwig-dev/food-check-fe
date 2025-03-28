import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import recipeReducer from "./Slices/recipeSlice";
import foodReducer from "./Slices/foodSlice";
import nutritionReducer from "./Slices/nutritionSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    recipe: recipeReducer,
    food: foodReducer,
    nutrition: nutritionReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;